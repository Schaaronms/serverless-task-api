provider "aws" {
  region = "sa-east-1"
}

resource "aws_iam_role" "lambda_role" {
  name = "serverless-task-api-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "api" {
  function_name = "serverless-task-api"

  filename         = "lambda.zip"
  source_code_hash = filebase64sha256("lambda.zip")

  role    = aws_iam_role.lambda_role.arn
  handler = "index.handler"
  runtime = "nodejs22.x"
}

module "dynamodb" {
  source = "./modules/dynamodb"
}
