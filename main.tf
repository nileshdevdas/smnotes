provider "aws" {
  region = "us-west-2"
}

variable "mybucket" {
  default = "nilesh-events-bucket1234"
}

resource aws_s3_bucket "bucket_create" {
  bucket = "nilesh-events-bucket1234"
}

output "printvpc" {
  value = var.MYVPC
}

output "printsubnet1" {
  value = var.subnet1
}

output "printsubnet2" {
  value = var.subnet2
}

data "aws_s3_bucket" "get_bucket_details" {
  bucket = var.mybucket
}

output "print_bucket_info" {
  value = data.aws_s3_bucket.get_bucket_details.arn
}



