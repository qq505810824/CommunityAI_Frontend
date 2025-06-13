#!/bin/bash
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
<<<<<<< HEAD
if ["$VERCEL_GIT_COMMIT_REF" == "main" ] ; then
=======
if ["$VERCEL_GIT_COMMIT_REF" == "calendar" ] ; then
>>>>>>> 85b71d680db1f78e7743e21c3646d2683df82f61
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;
else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi