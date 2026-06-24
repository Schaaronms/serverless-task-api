resource "aws_apigatewayv2_api" "tasks_api" {
  name          = "serverless-task-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda" {
  for_each = var.lambda_invoke_arns

  api_id                 = aws_apigatewayv2_api.tasks_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = each.value
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "create_task" {
  api_id    = aws_apigatewayv2_api.tasks_api.id
  route_key = "POST /tasks"
  target    = "integrations/${aws_apigatewayv2_integration.lambda["createTask"].id}"
}

resource "aws_apigatewayv2_route" "list_tasks" {
  api_id    = aws_apigatewayv2_api.tasks_api.id
  route_key = "GET /tasks"
  target    = "integrations/${aws_apigatewayv2_integration.lambda["listTasks"].id}"
}

resource "aws_apigatewayv2_route" "get_task" {
  api_id    = aws_apigatewayv2_api.tasks_api.id
  route_key = "GET /tasks/{taskId}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda["getTask"].id}"
}

resource "aws_apigatewayv2_route" "update_task" {
  api_id    = aws_apigatewayv2_api.tasks_api.id
  route_key = "PUT /tasks/{taskId}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda["updateTask"].id}"
}

resource "aws_apigatewayv2_route" "delete_task" {
  api_id    = aws_apigatewayv2_api.tasks_api.id
  route_key = "DELETE /tasks/{taskId}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda["deleteTask"].id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.tasks_api.id
  name        = "$default"
  auto_deploy = true
}
