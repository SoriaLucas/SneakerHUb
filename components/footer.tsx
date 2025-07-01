import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black-primary text-white border-t border-gray-dark">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/sneakerhub_sinfondo.png"
                alt="SneakerHub"
                width={120}
                height={60}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-light">
              Tu tienda de confianza para las mejores zapatillas. Calidad y estilo garantizados.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-light hover:text-orange-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-light hover:text-orange-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-light hover:text-orange-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-light hover:text-orange-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-orange-primary">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/productos" className="text-gray-light hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="text-gray-light hover:text-white transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/marcas" className="text-gray-light hover:text-white transition-colors">
                  Marcas
                </Link>
              </li>
              <li>
                <Link href="/nuevos" className="text-gray-light hover:text-white transition-colors">
                  Nuevos Lanzamientos
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-orange-primary">Atención al Cliente</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contacto" className="text-gray-light hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/envios" className="text-gray-light hover:text-white transition-colors">
                  Envíos
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="text-gray-light hover:text-white transition-colors">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-light hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-orange-primary">Contacto</h3>
            <div className="space-y-2 text-gray-light">
              <p>📧 info@sneakerhub.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Sneaker Street, Fashion City</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-dark mt-8 pt-8 text-center text-gray-light">
          <p>&copy; 2024 SneakerHub. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
