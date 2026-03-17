#!/bin/bash
cd /Users/kycin/.openclaw/workspace/MacBot/suncity-gpu
cd frontend && npm run dev &
cd ../backend && npm run dev &
