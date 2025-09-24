#!/bin/bash

# Frontend Deployment Script for AWS S3 + CloudFront

echo "🚀 Building React app..."
npm run build

echo "📦 Installing AWS CLI..."
# Install AWS CLI if not installed
# curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
# sudo installer -pkg AWSCLIV2.pkg -target /

echo "🔧 Configure AWS CLI with your credentials:"
echo "Run: aws configure"
echo "Enter your AWS Access Key ID, Secret Access Key, Region (us-east-1), and output format (json)"

echo "🪣 Creating S3 bucket..."
BUCKET_NAME="devtinder-frontend-$(date +%s)"
aws s3 mb s3://$BUCKET_NAME --region us-east-1

echo "🌐 Enabling static website hosting..."
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

echo "📤 Uploading files to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

echo "🔓 Setting bucket policy for public access..."
cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

echo "✅ Frontend deployed!"
echo "🌍 Website URL: http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
echo "💡 For HTTPS and custom domain, set up CloudFront distribution"