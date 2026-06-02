#!/bin/bash
ITEM_ID=$1
STATUS_TYPE=$2

if [ -z "$ITEM_ID" ] || [ -z "$STATUS_TYPE" ]; then
  echo "Usage: $0 <item-id> <IN_PROGRESS|DONE>"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/project-config.sh"

case $STATUS_TYPE in
  IN_PROGRESS)
    OPTION_ID=$STATUS_IN_PROGRESS_OPTION_ID
    ;;
  DONE)
    OPTION_ID=$STATUS_DONE_OPTION_ID
    ;;
  *)
    echo "Error: Unknown status type '$STATUS_TYPE'. Use IN_PROGRESS or DONE."
    exit 1
    ;;
esac

echo "Updating task $ITEM_ID to status $STATUS_TYPE..."
gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --field-id "$STATUS_FIELD_ID" --single-select-option-id "$OPTION_ID"
