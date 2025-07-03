"use client"

import { use, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, Play } from "lucide-react"
import { getProductById } from "@/data/products"
import { VideoPlayer } from "@/components/video-player"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const productId = Number.parseInt(id)
  const product = getProductById(productId)

  const [selectedMedia, setSelectedMedia] = useState(0)
  const [mediaType, setMediaType] = useState<"image" | "video">("image")
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Producto no encontrado</h1>
          <p className="text-gray-600 mt-2">El producto que buscas no existe.</p>
        </div>
      </div>
    )
  }

  const allMedia = [
    ...product.images.map((img, index) => ({ type: "image" as const, src: img, title: `Vista ${index + 1}` })),
    ...(product.videos || []).map((video) => ({
      type: "video" as const,
      src: video.url,
      title: video.title,
      thumbnail: video.thumbnail,
    })),
  ]

  const handleContactSeller = () => {
    const message = `Hola! Me interesa el producto: ${product.name} - Color: ${selectedColor} - Cantidad: ${quantity}`
    const whatsappUrl = `https://wa.me/2645312821?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const selectMedia = (index: number) => {
    setSelectedMedia(index)
    setMediaType(allMedia[index].type)
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Media principal */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            {mediaType === "image" ? (
              <Image
                src={allMedia[selectedMedia]?.src || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            ) : (
              <VideoPlayer
                src={allMedia[selectedMedia]?.src || ""}
                title={allMedia[selectedMedia]?.title || ""}
                thumbnail={allMedia[selectedMedia]?.type === "video" ? (allMedia[selectedMedia] as { thumbnail: string }).thumbnail : product.images[0]}
                className="w-full h-full"
              />
            )}
          </div>

          {/* Miniaturas */}
          <div className="grid grid-cols-4 gap-4">
            {allMedia.map((media, index) => (
              <button
                key={index}
                onClick={() => selectMedia(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 relative ${
                  selectedMedia === index ? "border-orange-500" : "border-gray-200"
                }`}
              >
                <Image
                  src={media.type === "image" ? media.src : media.thumbnail || product.images[0]}
                  alt={`${product.name} ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
                {media.type === "video" && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{product.brand}</Badge>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium ml-1">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reseñas)</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-orange-500">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                  <Badge className="bg-red-500">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Selector de color */}
          <div className="space-y-3">
            <h3 className="font-medium">Color: {selectedColor}</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedColor === color
                      ? "border-orange-500 bg-orange-50 text-orange-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad */}
          <div className="space-y-3">
            <h3 className="font-medium">Cantidad</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Acciones */}
          <div className="space-y-4">
            <Button
              onClick={handleContactSeller}
              className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6"
              disabled={!product.inStock}
            >
              {product.inStock ? "Contactar Vendedor" : "Agotado"}
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Heart className="w-4 h-4 mr-2" />
                Favoritos
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles en pestañas */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="features">Características</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas ({product.reviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-200/60 via-white/80 to-orange-100/80 blur-[2px] z-0"></div>
                  <div className="relative z-10 p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2">
                      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500 drop-shadow-lg"><rect x="4" y="4" width="24" height="24" rx="8"/><path d="M10 16h12M10 22h8"/></svg>
                      <h2 className="text-2xl font-bold text-orange-700 drop-shadow">Descripción del producto</h2>
                    </div>
                    <p className="text-gray-900 text-xl leading-relaxed font-light drop-shadow-sm">
                      {product.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="videos" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {product.videos && product.videos.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {product.videos.map((video, index) => (
                      <div key={index} className="space-y-3">
                        <VideoPlayer
                          src={video.url}
                          title={video.title}
                          thumbnail={video.thumbnail}
                          className="aspect-video"
                        />
                        <h4 className="font-medium">{video.title}</h4>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No hay videos disponibles para este producto.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold">{product.rating}</div>
                    <div>
                      <div className="flex items-center mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">Basado en {product.reviews} reseñas</p>
                    </div>
                  </div>
                  <div className="text-gray-600">
                    <p>Las reseñas de clientes aparecerán aquí...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
