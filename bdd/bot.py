import logging
import requests
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

TOKEN = '7481220673:AAHT4Uh2u36eR9bClxZ0ZVdEp5flecKMULo'
BASE_URL = 'http://localhost:5000/api2'  # URL вашего backend API
WEB_APP_URL = 'https://t.me/zibuuu_bot/Zibu'  # URL вашего веб-приложения
BOT_URL = 'https://t.me/zibuuu_bot'  # URL вашего бота для реферальной ссылки

logging.basicConfig(format='%(asctime)s - %(name)s - %(levellevel)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = update.message.from_user.id
    referral_id = context.args[0] if context.args else None

    # Проверка, существует ли пользователь
    response = requests.get(f'{BASE_URL}/user/{user_id}')
    if response.status_code == 200:
        await update.message.reply_text('Welcome back!')
    else:
        # Создание нового пользователя
        data = {
            'chatId': user_id,
            'referralId': referral_id,
            'premium': False  # Настройте в зависимости от данных пользователя
        }
        requests.post(f'{BASE_URL}/user/{user_id}', json=data)
        await update.message.reply_text('Welcome! Your account has been created.')

    # Кнопки для перехода на веб-приложение и получения реферальной ссылки
    keyboard = [
        [InlineKeyboardButton("Go to Web App", url=f'{WEB_APP_URL}?tg_id={user_id}')],
        [InlineKeyboardButton("Get Referral Link", callback_data='get_referral_link')],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Choose an action:', reply_markup=reply_markup)

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
