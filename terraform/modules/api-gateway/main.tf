resource "aws_apigatewayv2_api" "tasks_api" {
  name          = "serverless-task-api"
  protocol_type = "HTTP"
}
