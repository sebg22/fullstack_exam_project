import json
import psycopg2
from datetime import datetime

# Replace with your actual PostgreSQL connection details from Render
DATABASE_URL = "postgresql://postgres_db_lfd0_user:TfGhxX5Xtf0hAMtcLD4H12rm1yQUjv41@dpg-d0q5l4umcj7s73ep7dag-a.frankfurt-postgres.render.com/postgres_db_lfd0"

try:
    # Connect to PostgreSQL
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    print("Connected to the database successfully!")

    # Load JSON data from file
    with open("crypto_data.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    # SQL query for inserting data (including the roi components)
    insert_query = """
    INSERT INTO public.cryptos (
        id, symbol, name, image, current_price, market_cap, market_cap_rank,
        fully_diluted_valuation, total_volume, high_24h, low_24h, price_change_24h,
        price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h,
        circulating_supply, total_supply, max_supply, ath, ath_change_percentage,
        ath_date, atl, atl_change_percentage, atl_date, last_updated, 
        roi_times, roi_currency, roi_percentage
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ON CONFLICT (id) DO NOTHING;
    """

    # Insert each crypto entry into the database (including the roi components)
    for entry in data:
        roi = entry.get("roi", None)
        
        # Set defaults in case roi is None
        roi_times = roi.get("times", None) if roi else None
        roi_currency = roi.get("currency", None) if roi else None
        roi_percentage = roi.get("percentage", None) if roi else None

        # Ensure all 25 placeholders are populated
        cursor.execute(insert_query, (
            entry.get("id"),
            entry.get("symbol"),
            entry.get("name"),
            entry.get("image"),
            entry.get("current_price"),
            entry.get("market_cap"),
            entry.get("market_cap_rank"),
            entry.get("fully_diluted_valuation"),
            entry.get("total_volume"),
            entry.get("high_24h"),
            entry.get("low_24h"),
            entry.get("price_change_24h"),
            entry.get("price_change_percentage_24h"),
            entry.get("market_cap_change_24h"),
            entry.get("market_cap_change_percentage_24h"),
            entry.get("circulating_supply"),
            entry.get("total_supply"),
            entry.get("max_supply"),
            entry.get("ath"),
            entry.get("ath_change_percentage"),
            entry.get("ath_date"),
            entry.get("atl"),
            entry.get("atl_change_percentage"),
            entry.get("atl_date"),
            entry.get("last_updated"),
            roi_times,
            roi_currency,
            roi_percentage
        ))

    # Commit and close connection
    conn.commit()
    cursor.close()
    conn.close()
    print("Data successfully inserted into PostgreSQL!")

except Exception as e:
    print("Error:", e)
