#!/bin/bash

# Ensure the script exits if any command fails
set -e

# Function to check if required environment variables are set
check_env_vars() {
    local prefix=$1
    local vars=("USER" "HOST" "DIR")
    for var in "${vars[@]}"; do
        if [ -z "${!prefix$var}" ]; then
            echo "Error: ${prefix}${var} is not set. Please set all required environment variables."
            exit 1
        fi
    done
}

# Function to deploy
deploy() {
    local USER=$1
    local HOST=$2
    local DIR=$3

    echo "Deploying to $HOST..."

    # Sync files to the remote server
    rsync -avz --delete \
        --exclude '.git/' \
        --exclude '.gitignore' \
        --exclude 'deploy.sh' \
        "${LOCAL_DIR:-.}" "$USER@$HOST:$DIR"

    # Set permissions on the remote server
    ssh "$USER@$HOST" << EOF
        chmod -R 755 $DIR
        find $DIR -type f -exec chmod 644 {} \;
EOF

    echo "Deployment to $HOST completed successfully!"
}

# Check command line argument
if [ "$1" = "test" ]; then
    check_env_vars "TEST_"
    deploy "$TEST_USER" "$TEST_HOST" "$TEST_DIR"
elif [ "$1" = "prod" ]; then
    check_env_vars "PROD_"
    # Ask for confirmation before deploying to production
    read -p "Are you sure you want to deploy to production? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        deploy "$PROD_USER" "$PROD_HOST" "$PROD_DIR"
    else
        echo "Production deployment cancelled."
        exit 1
    fi
else
    echo "Usage: $0 {test|prod}"
    exit 1
fi