provider "aws" {
  region = "sa-east-1"
}

locals {
  handlers = {
    createTask = "src/handlers/createTask.handler"
    listTasks  = "src/handlers/listTasks.handler"
    getTask    = "src/handlers/getTask.handler"
    updateTask = "src/handlers/updateTask.handler"
    deleteTask = "src/handlers/deleteTask.handler"
  }
}

# ── IAM Role ─────────────────────────────────────────────────────────────────

resource "aws_iam_role" "lambda_role" {
  name = "serverless-task-api-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "dynamodb" {
  name = "serverless-task-api-dynamodb"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
      ]
      Resource = module.dynamodb.table_arn
    }]
  })
}

# ── Lambda Functions ──────────────────────────────────────────────────────────

resource "aws_lambda_function" "api" {
  for_each = local.handlers

  function_name    = "serverless-task-api-${each.key}"
  filename         = "../lambda.zip"
  source_code_hash = filebase64sha256("../lambda.zip")

  role    = aws_iam_role.lambda_role.arn
  handler = each.value
  runtime = "nodejs22.x"

  environment {
    variables = {
      TABLE_NAME = module.dynamodb.table_name
    }
  }
}

resource "aws_lambda_permission" "api_gateway" {
  for_each = local.handlers

  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api[each.key].function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.api_gateway.api_execution_arn}/*/*"
}

# ── Módulos ───────────────────────────────────────────────────────────────────

module "dynamodb" {
  source = "./modules/dynamodb"
}

module "api_gateway" {
  source = "./modules/api-gateway"

  lambda_invoke_arns = {
    for k, fn in aws_lambda_function.api : k => fn.invoke_arn
  }
}

# ── Outputs ───────────────────────────────────────────────────────────────────

output "api_endpoint" {
  value = module.api_gateway.api_endpoint
}
