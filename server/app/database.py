from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://loop_db_i8tz_user:hUrzljYqduDctu3Uxvkk6MWl1nkDdpTP@dpg-co80ehsf7o1s738o7l90-a.oregon-postgres.render.com/loop_db_i8tz"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
    # , connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker( bind=engine)

db=SessionLocal()