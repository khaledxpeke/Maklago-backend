-- Staff email → tenant routing for slugless cashier login (password remains in tenant DB).
CREATE TABLE "staff_login_directory" (
    "id" TEXT NOT NULL,
    "email_normalized" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_login_directory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "staff_login_directory_email_normalized_key" ON "staff_login_directory"("email_normalized");

CREATE UNIQUE INDEX "staff_login_directory_tenant_id_staff_id_key" ON "staff_login_directory"("tenant_id", "staff_id");

ALTER TABLE "staff_login_directory" ADD CONSTRAINT "staff_login_directory_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
