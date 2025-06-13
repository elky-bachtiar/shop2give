#!/bin/bash

# Script to configure Git for elky-bachtiar in the givio directory and subdirectories

# Get the absolute path to the givio directory
GIVIO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "Setting Git configuration for directory: $GIVIO_DIR"

# Set Git user name and email for this directory
git config --file "$GIVIO_DIR/.gitconfig" user.name "elky-bachtiar"
git config --file "$GIVIO_DIR/.gitconfig" user.email "bachtiare@gmail.com"

# Configure Git to use the specified SSH key for GitHub
cat > "$GIVIO_DIR/.git-ssh-config" << EOF
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ecdsa-elky-bachtiar
EOF

# Set GIT_SSH_COMMAND to use the custom SSH config
echo "Setting GIT_SSH_COMMAND environment variable when using Git in this directory"
cat > "$GIVIO_DIR/use-git.sh" << EOF
#!/bin/bash
export GIT_SSH_COMMAND="ssh -F $GIVIO_DIR/.git-ssh-config"
export GIT_CONFIG_GLOBAL="$GIVIO_DIR/.gitconfig"

echo "Git environment configured for user: elky-bachtiar"
echo "To use Git with these settings, run your git commands now or use:"
echo "git \$@"
EOF

chmod +x "$GIVIO_DIR/use-git.sh"

# Set the custom config file for Git
git config --local include.path ../.gitconfig 2>/dev/null || echo "Note: Not in a Git repository, only global settings were made."

echo "Git configuration completed!"
echo "To use Git with these settings:"
echo "1. For one-time usage: source $GIVIO_DIR/use-git.sh"
echo "2. For permanent usage in your terminal session: source $GIVIO_DIR/use-git.sh"
echo "   Then use Git commands normally."
