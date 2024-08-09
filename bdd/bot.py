import logging
import requests
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
import urllib.parse

TOKEN = '7481220673:AAHT4Uh2u36eR9bClxZ0ZVdEp5flecKMULo'
BASE_URL = 'https://telegrams.su/api2'  # Backend API URL
WEB_APP_URL = 'https://t.me/zibuuu_bot/Zibu'  # Web App URL
BOT_URL = 'https://t.me/zibuuu_bot'  # Bot URL for referral link

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = update.message.from_user.id
    referral_id = context.args[0] if context.args else None

    logger.info(f"Received /start command from user {user_id} with referral_id {referral_id}")

    # Check if user exists in the database
    try:
        response = requests.get(f'{BASE_URL}/user/{user_id}')
        response.raise_for_status()  # Raises an HTTPError if the status is 4xx, 5xx
        user_data = response.json()  # May raise JSONDecodeError if response isn't JSON
    except requests.exceptions.HTTPError as http_err:
        logger.error(f"HTTP error occurred: {http_err}")
        await update.message.reply_text('Error checking your account. Please try again later.')
        return
    except requests.exceptions.JSONDecodeError as json_err:
        logger.error(f"JSON decode error: {json_err}")
        user_data = None
    except Exception as err:
        logger.error(f"Other error occurred: {err}")
        await update.message.reply_text('An unexpected error occurred. Please try again later.')
        return

    if not (response.status_code == 200 and user_data):
        # Create a new user if they don't exist
        data = {
            'chatId': user_id,
            'referralId': referral_id,
            'premium': False  # Adjust this based on your logic
        }
        try:
            creation_response = requests.post(f'{BASE_URL}/user/{user_id}', json=data)
            creation_response.raise_for_status()
            await update.message.reply_text('Your account has been created.')
        except requests.exceptions.HTTPError as http_err:
            logger.error(f"HTTP error occurred during account creation: {http_err}")
            await update.message.reply_text('Error creating your account. Please try again later.')
            return
        except Exception as err:
            logger.error(f"Other error occurred during account creation: {err}")
            await update.message.reply_text('An unexpected error occurred while creating your account. Please try again later.')
            return

    # Prepare data to be sent to the WebApp
    web_app_data = {
        "user_id": user_id,
        "balance": user_data.get("balance", 0),
        "coins_per_day": user_data.get("coins_per_day", 0),
        "wallet": user_data.get("wallet", ""),
        "referral_id": referral_id
    }

    # Encode the data as a JSON string and then URL encode it
    encoded_data = urllib.parse.quote(str(web_app_data))

    # Create the WebApp URL with the encoded data
    web_app_url_with_data = f'{WEB_APP_URL}?tg_id={user_id}&data={encoded_data}'

    # Buttons to navigate to the web app and get the referral link
    keyboard = [
        [InlineKeyboardButton("Go to Web App", url=web_app_url_with_data)],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Hello!\nPlay game', reply_markup=reply_markup)

async def button(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    user_id = query.from_user.id

    if query.data == 'get_referral_link':
        referral_link = f'{BOT_URL}?start={user_id}'
        await query.edit_message_text(text=f"Your referral link: {referral_link}")

def main() -> None:
    application = Application.builder().token(TOKEN).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CallbackQueryHandler(button))

    application.run_polling()

if __name__ == '__main__':
    main()
