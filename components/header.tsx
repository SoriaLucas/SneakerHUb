"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Menu, Search, User, Heart, X } from "lucide-react"
import { getAllProducts } from "@/data/products"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const pathname = usePathname()

  const allProducts = getAllProducts()

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/productos" },
    { name: "Hombre", href: "/productos?categoria=hombre" },
    { name: "Mujer", href: "/productos?categoria=mujer" },
    /*{ name: "Ofertas", href: "/ofertas" }*/,
  ]

  // Detectar scroll para cambiar el estilo de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-black-primary/95 backdrop-blur-xl border-b border-gray-dark/50 shadow-2xl shadow-black/20"
            : "bg-black-primary/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-out ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Logo con animación */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/images/sneakerhub_sinfondo.png"
                  alt="Hub"
                  width={120}
                  height={60}
                  className={`transition-all duration-500 ease-out group-hover:scale-110 ${
                    scrolled ? "h-7 w-auto" : "h-8 w-auto"
                  }`}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </Link>

            {/* Desktop Navigation con indicadores activos */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.filter(Boolean).map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-out rounded-full group ${
                      isActive
                        ? "text-orange-primary bg-orange-primary/10"
                        : "text-white hover:text-orange-primary hover:bg-white/5"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideInDown 0.6s ease-out forwards",
                    }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Indicador activo */}
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-orange-primary transition-all duration-300 ${
                        isActive ? "w-6" : "w-0 group-hover:w-4"
                      }`}
                    ></div>
                    {/* Efecto hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-primary/10 to-orange-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </Link>
                )
              })}
            </nav>

            {/* Actions con animaciones mejoradas */}
            <div className="flex items-center space-x-2">
              {[
                { icon: Search, label: "Buscar", onClick: () => setShowSearch(true) },
                { icon: Heart, label: "Favoritos", onClick: undefined },
                // { icon: User, label: "Perfil", onClick: undefined },
              ].map(({ icon: Icon, label, onClick }, index) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex text-white hover:text-orange-primary hover:bg-white/10 transition-all duration-300 rounded-full group relative overflow-hidden"
                  style={{
                    animationDelay: `${(index + 3) * 100}ms`,
                    animation: "slideInDown 0.6s ease-out forwards",
                  }}
                  onClick={onClick as (() => void) | undefined}
                  type="button"
                >
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </Button>
              ))}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white hover:text-orange-primary hover:bg-white/10 transition-all duration-300 rounded-full group relative overflow-hidden"
                style={{
                  animationDelay: "600ms",
                  animation: "slideInDown 0.6s ease-out forwards",
                }}
                type="button"
              >
                <div className="relative">
                  <Menu
                    className={`h-5 w-5 transition-all duration-300 ${
                      isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${
                      isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                    }`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </Button>
            </div>
          </div>
        </div>

        {/* Línea de progreso sutil */}
        <div
          className={`h-px bg-gradient-to-r from-transparent via-orange-primary/50 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      </header>

      {/* Mobile Menu Overlay */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-full sm:w-[400px] bg-black-primary/95 backdrop-blur-xl border-l border-gray-dark/50 p-0"
        >
          <div className="flex flex-col h-full">
            {/* Header del menú móvil */}
            <div className="flex items-center justify-between p-6 border-b border-gray-dark/50">
              <Image src="/images/sneakerhub_sinfondo.png" alt="Hub" width={100} height={50} className="h-6 w-auto" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-orange-primary hover:bg-white/10 rounded-full"
                type="button"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navegación móvil */}
            <nav className="flex-1 px-6 py-8">
              <div className="space-y-2">
                {navigation.filter((item): item is { name: string; href: string } => Boolean(item)).map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-xl group ${
                        isActive
                          ? "text-orange-primary bg-orange-primary/10 border border-orange-primary/20"
                          : "text-white hover:text-orange-primary hover:bg-white/5"
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: isOpen ? "slideInRight 0.4s ease-out forwards" : "",
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {isActive && <div className="w-2 h-2 bg-orange-primary rounded-full animate-pulse"></div>}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Footer del menú móvil */}
            <div className="p-6 border-t border-gray-dark/50">
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="ghost"
                  className="flex flex-col items-center gap-2 p-4 text-white hover:text-orange-primary hover:bg-white/5 rounded-xl transition-all duration-300"
                  onClick={() => {
                    setIsOpen(false)
                    setShowSearch(true)
                  }}
                  type="button"
                >
                  <Search className="h-5 w-5" />
                  <span className="text-xs">Buscar</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex flex-col items-center gap-2 p-4 text-white hover:text-orange-primary hover:bg-white/5 rounded-xl transition-all duration-300"
                  type="button"
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-xs">Favoritos</span>
                </Button>
                {/*<Button
                  variant="ghost"
                  className="flex flex-col items-center gap-2 p-4 text-white hover:text-orange-primary hover:bg-white/5 rounded-xl transition-all duration-300"
                  type="button"
                >
                  <User className="h-5 w-5" />
                  <span className="text-xs">Perfil</span>
                </Button>*/}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 backdrop-blur-sm">
          <div className="mt-24 bg-black-primary rounded-xl shadow-2xl p-4 flex flex-col gap-2 w-full max-w-md mx-auto relative">
            <div className="flex items-center gap-2">
              <input
                autoFocus
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Buscar productos..."
                className="flex-1 bg-transparent border-none outline-none text-white text-lg px-2 py-1"
                onKeyDown={e => {
                  if (e.key === 'Escape') setShowSearch(false)
                  if (e.key === 'Enter') {
                    window.location.href = `/productos?search=${encodeURIComponent(searchValue)}`
                    setShowSearch(false)
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-orange-primary"
                onClick={() => setShowSearch(false)}
                type="button"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Sugerencias de productos */}
            {searchValue.trim().length > 0 && (
              <div className="bg-black-primary rounded-lg shadow-lg max-h-72 overflow-y-auto border border-gray-700 divide-y divide-gray-800">
                {allProducts
                  .filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase()))
                  .slice(0, 6)
                  .map(product => (
                    <button
                      key={product.id}
                      className="flex items-center w-full gap-3 px-3 py-2 hover:bg-orange-primary/10 transition-colors"
                      onClick={() => {
                        window.location.href = `/producto/${product.id}`
                        setShowSearch(false)
                      }}
                      type="button"
                    >
                      <Image src={product.image || "/placeholder.svg"} alt={product.name} width={40} height={40} className="rounded-md object-cover" />
                      <span className="text-left text-white text-sm font-medium">{product.name}</span>
                    </button>
                  ))}
                {allProducts.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase())).length === 0 && (
                  <div className="text-gray-400 px-3 py-2 text-sm">No se encontraron productos</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Estilos CSS para las animaciones */}
      <style jsx>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
