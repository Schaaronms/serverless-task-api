output "api_endpoint" {
  value = aws_apigatewayv2_api.tasks_api.api_endpoint
}

output "api_execution_arn" {
  value = aws_apigatewayv2_api.tasks_api.execution_arn
}

