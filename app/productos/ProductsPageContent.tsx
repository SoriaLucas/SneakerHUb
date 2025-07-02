"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star } from "lucide-react"
import { getAllProducts } from "@/data/products"
import { useSearchParams } from "next/navigation"

const brands = ["Nike", "Adidas", "Jordan", "Puma", "Converse", "New Balance"]

export default function ProductsPageContent() {
  const allProducts = getAllProducts()
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedGender, setSelectedGender] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("relevance")
  const searchParams = useSearchParams()

  useEffect(() => {
    const categoria = searchParams.get("categoria")
    if (categoria === "hombre" || categoria === "mujer" || categoria === "unisex") {
      setSelectedGender(categoria)
    }
  }, [searchParams])

  const applyFilters = () => {
    let filtered = allProducts

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    if (selectedGender !== "all") {
      filtered = filtered.filter((product) => product.gender === selectedGender || product.gender === "unisex")
    }

    if (sortBy === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(filtered)
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  useEffect(() => {
    applyFilters()
    // eslint-disable-next-line
  }, [selectedGender, selectedCategory, selectedBrands, sortBy, allProducts])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Todos los Productos</h1>
        <p className="text-gray-600">Descubre nuestra colección completa de zapatillas</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border space-y-6">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">Filtros</h3>
            </div>

            {/* Brand Filter */}
            <div className="space-y-3">
              <h4 className="font-medium">Marca</h4>
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <label htmlFor={brand} className="text-sm">
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h4 className="font-medium">Categoría</h4>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender Filter */}
            <div className="space-y-3">
              <h4 className="font-medium">Género</h4>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="hombre">Hombre</SelectItem>
                  <SelectItem value="mujer">Mujer</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={applyFilters} className="w-full bg-orange-500 hover:bg-orange-600">
              Aplicar Filtros
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Mostrando {filteredProducts.length} productos</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevancia</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Valorados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && <Badge className="absolute top-3 left-3 bg-red-500">Oferta</Badge>}
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} reseñas)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-500">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
                      <Link href={`/producto/${product.id}`}>Ver Detalles</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
