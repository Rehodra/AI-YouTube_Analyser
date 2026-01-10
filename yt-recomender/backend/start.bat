@echo off
echo Installing all backend dependencies...
echo.

REM Activate virtual environment
call .venv\Scripts\activate.bat

REM Upgrade pip
python -m pip install --upgrade pip

REM Install all dependencies
python -m pip install -r requirements.txt

echo.
echo ========================================
echo All dependencies installed successfully!
echo ========================================
echo.
echo Starting server...
python -m uvicorn app.main:app --reload
