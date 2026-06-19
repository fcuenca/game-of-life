#!/bin/bash
ITEM_ID=$1
NEW_BODY=$2

if [ -z "$ITEM_ID" ] || [ -z "$NEW_BODY" ]; then
  echo "Usage: $0 <item-id> <new-body-text>"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/project-config.sh"

# Fetch item details to determine if it's an Issue or a Draft
ITEM_DATA=$(gh project item-list "$PROJECT_NUMBER" --owner "$PROJECT_OWNER" --format json | jq -r ".items[] | select(.id == \"$ITEM_ID\")")

if [ -z "$ITEM_DATA" ]; then
  echo "Error: Could not find item with ID $ITEM_ID"
  exit 1
fi

TYPE=$(echo "$ITEM_DATA" | jq -r '.content.type')

if [ "$TYPE" == "Issue" ]; then
  ISSUE_NUMBER=$(echo "$ITEM_DATA" | jq -r '.content.number')
  REPO=$(echo "$ITEM_DATA" | jq -r '.content.repository')
  echo "Detected Issue #$ISSUE_NUMBER in $REPO. Updating body..."
  gh issue edit "$ISSUE_NUMBER" --repo "$REPO" --body "$NEW_BODY"
elif [ "$TYPE" == "DraftIssue" ]; then
  echo "Detected Draft Issue. Updating body..."
  gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --body "$NEW_BODY"
else
  echo "Error: Unsupported item type '$TYPE'."
  exit 1
fi
