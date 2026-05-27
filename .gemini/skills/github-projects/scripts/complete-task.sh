#!/bin/bash
ITEM_ID=$1
if [ -z "$ITEM_ID" ]; then
  echo "Usage: $0 <item-id>"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/project-config.sh"

echo "Marking task $ITEM_ID as Done..."
gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --field-id "$STATUS_FIELD_ID" --single-select-option-id "$STATUS_DONE_OPTION_ID"
