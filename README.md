# ITI Logo Generator

This README provides instructions for deploying the ITI Logo Generator website to test and production environments.

## Prerequisites

- Bash shell
- SSH access to the test and production servers
- SSH key authentication set up for both servers
- `rsync` installed on your local machine

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Make the deployment script executable:
   ```
   chmod +x deploy.sh
   ```

3. Create a `.env` file in the project root directory:
   ```
   touch .env
   ```

4. Open the `.env` file and add the following environment variables, replacing the values with your actual server details:
   ```
   TEST_USER="test_username"
   TEST_HOST="test_hostname_or_ip"
   TEST_DIR="/path/to/test/directory"
   PROD_USER="prod_username"
   PROD_HOST="prod_hostname_or_ip"
   PROD_DIR="/path/to/prod/directory"
   LOCAL_DIR="./path/to/local/directory"
   ```

   Note: `LOCAL_DIR` should be the path to your project's root directory, relative to where the `deploy.sh` script is located. If the script is in the project root, you can use `LOCAL_DIR="./"`. Notice as well that to only copy the contents of the local directory add a trailing slash, for example `LOCAL_DIR="./src/"` to copy the contents of the src directory.

5. Add `.env` to your `.gitignore` file to prevent it from being committed to the repository:
   ```
   echo ".env" >> .gitignore
   ```

## Usage

To deploy to the test environment:

```
source .env
./deploy.sh test
```

To deploy to the production environment:

```
source .env
./deploy.sh prod
```

When deploying to production, you will be prompted for confirmation before the deployment proceeds.

## Adding or Updating Environment Variables

If you need to add or update environment variables:

1. Edit the `.env` file with the new or updated variables.
2. If you've added new variables that the `deploy.sh` script needs to use, update the `check_env_vars` function in `deploy.sh` to include checks for these new variables.

## Troubleshooting

- If you encounter permission issues, ensure that your SSH key is properly set up on the remote servers.
- If the script fails to find the `rsync` command, make sure it's installed on your local machine.
- If you get "variable not set" errors, ensure all required variables are defined in your `.env` file and that you've sourced the file before running the script.

## Security Notes

- Never commit the `.env` file to the repository.
- Regularly rotate SSH keys and update server credentials.
- Limit SSH access to only the necessary IP addresses if possible.

## Maintenance

- Regularly review and update the deployment script as needed.
- Keep the README updated with any changes to the deployment process.
- Ensure all team members have the latest version of the `.env` template (without actual values) for reference.

For any questions or issues with the deployment process, please contact the DevOps team.