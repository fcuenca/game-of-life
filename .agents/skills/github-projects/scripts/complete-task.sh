#!/bin/bash
ITEM_ID=$1
if [ -z "$ITEM_ID" ]; then
  echo "Usage: $0 <item-id>"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Delegate to the new generic status script
bash "${SCRIPT_DIR}/update-task-status.sh" "$ITEM_ID" "DONE"
