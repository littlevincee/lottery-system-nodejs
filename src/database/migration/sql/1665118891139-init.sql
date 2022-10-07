CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE category (
   id uuid DEFAULT gen_random_uuid()
    PRIMARY KEY,
   category VARCHAR(50) NOT NULL,
   description VARCHAR(250) NOT NULL,
   key VARCHAR(50) NOT NULL,
   version INTEGER DEFAULT 1 NOT NULL,
   is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
   deleted_date TIMESTAMP NULL,
   created_by uuid default '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
   created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   updated_by uuid default '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
   updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   CONSTRAINT category_category_uq UNIQUE (category)
);

INSERT INTO category (category, description, key)
VALUES ('cash_coupon', 'cash coupon', 'cc'),
       ('free_coupon', 'free coupon', 'fc'),
       ('no_prize', 'no prize', 'np');

CREATE TABLE prize (
   id uuid DEFAULT gen_random_uuid()
    PRIMARY KEY,
   category_id UUID
    CONSTRAINT prize_category_fk
      REFERENCES category(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
   description VARCHAR(250) NOT NULL,
   key VARCHAR(50) NOT NULL,
   total_quota INTEGER,
   daily_quota INTEGER,
   has_quota BOOLEAN NOT NULL,
   probability DECIMAL(5,2) NOT NULL,
   version INTEGER DEFAULT 1 NOT NULL,
   is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
   deleted_date TIMESTAMP NULL,
   created_by uuid default '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
   created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   updated_by uuid default '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
   updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   CONSTRAINT prize_key_uq UNIQUE (key)
);

WITH ins (description, key, category, has_quota, total_quota, daily_quota, probability) AS
( VALUES
    ('$5 Cash Coupon', '5CC', 'cash_coupon', true, 500, 100, 0.5),
    ('$2 Cash Coupon', '2CC', 'cash_coupon', true, 5000, 500, 2),
    ('Buy 1 Get 1 Free Coupon', '1fc', 'free_coupon', false, null, null, 80),
    ('No Prize', 'np', 'no_prize', false, null, null, 17.5)
)
INSERT INTO prize
   (description, key, category_id, has_quota, total_quota, daily_quota, probability)
SELECT
    ins.description, ins.key, category.id, ins.has_quota, ins.total_quota, ins.daily_quota, ins.probability
FROM
  category JOIN ins
    ON ins.category = category.category;

CREATE TABLE participated_customer (
   id uuid DEFAULT gen_random_uuid()
    PRIMARY KEY,
   mobile_number VARCHAR(20) NOT NULL,
   participated_date DATE NOT NULL,
   prize_id UUID
    CONSTRAINT participated_customer_prize_fk
      REFERENCES prize(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
   redeem_code VARCHAR(50),
   is_prize_redeemed BOOLEAN,
   version INTEGER DEFAULT 1 NOT NULL,
   is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
   deleted_date TIMESTAMP NULL,
   created_by uuid default '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
   created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   updated_by uuid default '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
   updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
   CONSTRAINT participated_customer_mobile_number_participated_date_uq UNIQUE (mobile_number, participated_date)
);

CREATE INDEX IF NOT EXISTS idx_prize_category_key ON prize (key);
CREATE INDEX IF NOT EXISTS idx_prize_id_category_id ON prize (id, category_id);