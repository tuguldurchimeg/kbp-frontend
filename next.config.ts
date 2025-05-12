import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: { domains: process.env.NEXT_AWS_S3_BUCKET?.split(",") },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
