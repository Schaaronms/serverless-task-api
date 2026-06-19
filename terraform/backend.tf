terraform {
  backend "s3" {
    bucket = "schaaron-serverless-task-api-tfstate"
    key    = "terraform.tfstate"
    region = "sa-east-1"
  }
}
