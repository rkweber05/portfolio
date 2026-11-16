/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera .next/standalone: um servidor Node mínimo, sem node_modules inteiro.
  // É o que deixa a imagem Docker pequena.
  output: "standalone",
  poweredByHeader: false,
};

export default nextConfig;
