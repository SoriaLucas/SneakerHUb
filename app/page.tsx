"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight } from "lucide-react"
import { getFeaturedProducts } from "@/data/products"
import { useState } from "react"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const [showWhatsAppOptions, setShowWhatsAppOptions] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Hero Section with Nike Sneaker Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/portada.jpg"
            alt="Nike Air Max negras y azules sostenidas en la mano"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black-primary/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-orange-primary hover:bg-orange-hover text-white text-lg px-6 py-2 font-semibold">
              Nueva Colección 2024
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
              Las mejores zapatillas para tu estilo
            </h1>

            <p className="text-xl lg:text-2xl text-gray-light leading-relaxed max-w-3xl mx-auto">
              Descubre nuestra colección exclusiva de zapatillas de las mejores marcas. Calidad, comodidad y estilo en
              cada paso que das.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                asChild
                size="lg"
                className="bg-orange-primary hover:bg-orange-hover text-white text-lg px-8 py-4 font-semibold transition-all duration-300"
              >
                <Link href="/productos" className="flex items-center gap-2">
                  Ver Colección
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-light text-gray-light hover:bg-gray-light hover:text-black-primary bg-transparent text-lg px-8 py-4 font-semibold transition-all duration-300"
              >
                <Link href="/ofertas">Ofertas Especiales</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-light animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-light rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-light rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-black-primary">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Productos Destacados</h2>
            <p className="text-gray-light text-xl max-w-3xl mx-auto">
              Descubre nuestra selección de zapatillas más populares y nuevos lanzamientos
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group bg-gray-dark rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-orange-primary/20 transition-all duration-500 border border-gray-light/20 overflow-hidden transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <Badge className="absolute top-2 left-2 lg:top-4 lg:left-4 bg-orange-primary text-white px-2 py-1 lg:px-3 lg:py-1.5 rounded-full text-xs lg:text-sm font-semibold shadow-lg">
                      {product.badge}
                    </Badge>
                    {/* Overlay sutil en hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-3 lg:p-6 space-y-2 lg:space-y-4">
                    <h3 className="font-bold text-sm lg:text-xl text-white group-hover:text-orange-primary transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 lg:gap-2">
                      <div className="flex items-center bg-gray-light/20 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full">
                        <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs lg:text-sm font-semibold ml-1 text-white">{product.rating}</span>
                      </div>
                      <span className="text-xs lg:text-sm text-gray-light">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-3">
                      <span className="text-lg lg:text-2xl font-bold text-orange-primary">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm lg:text-lg text-gray-light line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      asChild
                      className="w-full bg-orange-primary hover:bg-orange-hover text-white py-2 lg:py-3 rounded-xl text-sm lg:text-base font-semibold transition-all duration-300 transform group-hover:scale-105"
                    >
                      <Link href={`/producto/${product.id}`}>Ver Detalles</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <div className="text-center mt-16">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg bg-transparent border-gray-light text-gray-light hover:bg-gray-light hover:text-black-primary font-semibold transition-all duration-300"
            >
              <Link href="/productos">Ver Todos los Productos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section className="py-20 bg-gray-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              ¿Querés enterarte antes que nadie de nuestras promos y novedades?
            </h2>
            <p className="text-xl text-gray-light">
              Unite a nuestro chat de WhatsApp y recibí atención personalizada, rápida y cercana.
            </p>

            {!showWhatsAppOptions ? (
              <Button
                onClick={() => setShowWhatsAppOptions(true)}
                className="bg-orange-primary text-white hover:bg-orange-hover px-10 py-4 text-lg font-semibold transition-all duration-300"
                size="lg"
              >
                Unirme al Chat
              </Button>
            ) : (
              <div className="space-y-6">
                <p className="text-xl text-gray-light">¿Qué tipo de compra realizás?</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    asChild
                    className="bg-orange-primary text-white hover:bg-orange-hover px-10 py-4 text-lg font-semibold transition-all duration-300"
                    size="lg"
                  >
                    <a
                      href="https://wa.me/1234567890?text=Hola! Me interesa hacer compras particulares"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Compra Particular
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="bg-gray-dark border border-gray-light text-white hover:bg-gray-light hover:text-black-primary px-10 py-4 text-lg font-semibold transition-all duration-300"
                    size="lg"
                    variant="outline"
                  >
                    <a
                      href="https://wa.me/1234567890?text=Hola! Me interesa hacer compras mayoristas"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Compra Mayorista
                    </a>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowWhatsAppOptions(false)}
                  className="text-gray-light hover:text-white hover:bg-gray-light/20 transition-all duration-300"
                >
                  Volver
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
