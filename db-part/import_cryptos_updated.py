import json
import psycopg2

DATABASE_URL = "postgresql://postgres_db_lfd0_user:TfGhxX5Xtf0hAMtcLD4H12rm1yQUjv41@dpg-d0q5l4umcj7s73ep7dag-a.frankfurt-postgres.render.com/postgres_db_lfd0"

def safe_get(entry, key, default=None):
    val = entry.get(key)
    if val is None:
        return default
    return val

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    print("✅ Connected to the database!")

    with open("final_crypto_data_mocked.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    insert_query = """
    INSERT INTO public.all_cryptos (
        id, symbol, name, image, current_price, market_cap, market_cap_rank,
        total_volume, circulating_supply, price_change_percentage_24h,
        description, total_supply, max_supply, ath, price_change_percentage_1y,
        fdv, genesis_date, is_stablecoin
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ON CONFLICT (id) DO NOTHING;
    """

    for entry in data:
        cursor.execute(insert_query, (
            entry.get("id"),
            entry.get("symbol"),
            entry.get("name"),
            entry.get("image"),
            entry.get("current_price"),
            entry.get("market_cap"),
            entry.get("market_cap_rank"),
            entry.get("total_volume"),
            entry.get("circulating_supply"),
            entry.get("price_change_percentage_24h"),
            entry.get("description"),
            safe_get(entry, "total_supply", None),   # allow None
            safe_get(entry, "max_supply", None),     # allow None
            safe_get(entry, "ath", None),             # allow None
            safe_get(entry, "price_change_percentage_1y", None),  # allow None
            safe_get(entry, "fdv", None),             # allow None
            safe_get(entry, "genesis_date", None),   # allow None
            entry.get("is_stablecoin"),
        ))

    conn.commit()
    cursor.close()
    conn.close()
    print("🎉 Data successfully inserted!")

except Exception as e:
    print("❌ Error:", e)
