#!/bin/bash

# script to toggle chrome sandbox restrictions for electron apps

# get the current status of the restriction
current_status=$(sysctl -n kernel.apparmor_restrict_unprivileged_userns)

if [ "$current_status" -eq 0 ]; then
    # if the current status is 0 (deactivated), activate the restriction
    sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=1
    echo "Chrome sandbox restrictions activated."
elif [ "$current_status" -eq 1 ]; then
    # if the current status is 1 (activated), deactivate the restriction
    sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
    echo "Chrome sandbox restrictions deactivated."
else
    echo "Unknown status: $current_status"
fi
