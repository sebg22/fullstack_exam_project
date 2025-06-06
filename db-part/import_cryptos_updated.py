import json
import psycopg2
import bcrypt

DATABASE_URL = "postgresql://postgres_db_lfd0_user:TfGhxX5Xtf0hAMtcLD4H12rm1yQUjv41@dpg-d0q5l4umcj7s73ep7dag-a.frankfurt-postgres.render.com/postgres_db_lfd0"

def safe_get(entry, key, default=None):
    val = entry.get(key)
    if val is None:
        return default
    return val

def hash_password(plain_text):
    return bcrypt.hashpw(plain_text.encode("utf-8"), bcrypt.gensalt(rounds=10)).decode("utf-8")

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    print("✅ Connected to the database!")

    # --- Clear existing data ---
    cursor.execute("DELETE FROM users WHERE email IN (%s, %s, %s, %s)", (
    "admin@example.com",
    "alice@example.com",
    "bob@example.com",
    "charlie@example.com"
    ))

    # --- Insert users ---
    users_to_insert = [
        {
            "name": "Admin1",
            "last_name": "User",
            "email": "admin@example.com",
            "password": "password",
            "role": "admin"
        },
        {
            "name": "Alice",
            "last_name": "Smith",
            "email": "alice@example.com",
            "password": "password",
            "role": "user"
        },
        {
            "name": "Bob",
            "last_name": "Johnson",
            "email": "bob@example.com",
            "password": "password",
            "role": "user"
        },
        {
            "name": "Charlie",
            "last_name": "Brown",
            "email": "charlie@example.com",
            "password": "password",
            "role": "user"
        },
    ]

    for user in users_to_insert:
        cursor.execute("""
            INSERT INTO users (id, name, last_name, email, password, role)
            VALUES (uuid_generate_v4(), %s, %s, %s, %s, %s)
            ON CONFLICT (email) DO NOTHING;
        """, (
            user["name"],
            user["last_name"],
            user["email"],
            hash_password(user["password"]),
            user["role"]
        ))

    print("👥 Users inserted (or skipped if already exist).")

    # --- Insert crypto data ---
    with open("final_crypto_data_mocked.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    insert_query = """
    INSERT INTO public.cryptos (
        id, symbol, name, image, current_price, market_cap, market_cap_rank,
        total_volume, circulating_supply, price_change_percentage_24h,
        description, total_supply, max_supply, ath, price_change_percentage_1y,
        fdv, genesis_date, is_stablecoin, chart_data
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
            safe_get(entry, "total_supply", None),
            safe_get(entry, "max_supply", None),
            safe_get(entry, "ath", None),
            safe_get(entry, "price_change_percentage_1y", None),
            safe_get(entry, "fdv", None),
            safe_get(entry, "genesis_date", None),
            entry.get("is_stablecoin"),
            json.dumps(entry.get("chart_data", [])),
        ))


    conn.commit()
    cursor.close()
    conn.close()
    print("🎉 Users and crypto data inserted successfully!")

except Exception as e:
    print("❌ Error:", e)
