from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://link_loop_db_pemf_user:BE0ad2dr46gxVFnMzMeCsVY5coTsnzMq@dpg-co82spa0si5c73b63omg-a.oregon-postgres.render.com/link_loop_db_pemf"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
    # , connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker( bind=engine)

db=SessionLocal()