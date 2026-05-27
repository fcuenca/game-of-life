#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/project-config.sh"

# Fetch items from the project
# We use jq to filter for the item that is "In Progress"
# and extract the Title, Body, and ID.
gh project item-list "$PROJECT_NUMBER" --owner "$PROJECT_OWNER" --format json | jq -r '
  .items[] | 
  select(.status == "In Progress") | 
  "Task: \(.content.title)\nDescription: \(.content.body)\nItem ID: \(.id)"
'
