'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

// Types pour nos données
interface News {
  id: number
  title: string
  description: string
  imageUrl: string
  date: string
  category: string
  author?: {
    name: string
    role: string
    imageUrl: string
  }
}

// Données de test pour les news
const newsData: News[] = [
  {
    id: 1,
    title: "Innovation dans le secteur de l'énergie",
    description: "Une nouvelle technologie révolutionnaire promet de transformer le secteur de l'énergie avec une efficacité accrue et une empreinte carbone réduite. Cette avancée pourrait permettre une transition plus rapide vers les énergies renouvelables et réduire considérablement notre dépendance aux combustibles fossiles.",
    imageUrl: "/placeholder.jpg",
    date: "2024-04-05",
    category: "Énergie",
    author: {
      name: "Marie Dupont",
      role: "Experte en énergie",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  },
  {
    id: 2,
    title: "Tendances du marché immobilier 2024",
    description: "Analyse approfondie des tendances actuelles du marché immobilier et projections pour l'année 2024. Les experts prévoient une stabilisation des prix après la période de volatilité, avec un intérêt croissant pour les propriétés écologiques et les espaces de travail hybrides.",
    imageUrl: "/placeholder.jpg",
    date: "2024-04-04",
    category: "Immobilier",
    author: {
      name: "Thomas Martin",
      role: "Analyste immobilier",
      imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  },
  {
    id: 3,
    title: "L'IA transforme le conseil en entreprise",
    description: "L'intelligence artificielle révolutionne le secteur du conseil en entreprise, permettant des analyses plus précises et des recommandations personnalisées. Les cabinets de conseil adoptent rapidement ces technologies pour améliorer leur efficacité et offrir de nouveaux services à leurs clients.",
    imageUrl: "/placeholder.jpg",
    date: "2024-04-03",
    category: "Technologie",
    author: {
      name: "Sophie Laurent",
      role: "Consultante en transformation digitale",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  },
  {
    id: 4,
    title: "Durabilité et croissance économique",
    description: "Comment les entreprises intègrent la durabilité dans leur modèle économique tout en maintenant une croissance robuste. Les études montrent que les entreprises engagées dans des pratiques durables obtiennent de meilleurs résultats financiers à long terme.",
    imageUrl: "/placeholder.jpg",
    date: "2024-04-02",
    category: "Développement durable",
    author: {
      name: "Lucas Dubois",
      role: "Expert en économie circulaire",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  }
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState<News | null>(null)
  const [searchPanel, setSearchPanel] = useState<'none' | 'company' | 'project'>('none')
  const [activePage, setActivePage] = useState<'news' | 'company' | 'project'>('news')
  const backgroundRef = useRef<HTMLDivElement>(null)

  // Animation du fond avec GSAP
  useEffect(() => {
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        x: 'random(-20, 20)',
        y: 'random(-20, 20)',
        rotation: 'random(-5, 5)',
        duration: 'random(15, 25)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }
  }, [])

  const navigation = [
    { name: 'Actualités', href: '#', action: () => setActivePage('news') },
    { name: 'Recherche Entreprise', href: '#', action: () => setActivePage('company') },
    { name: 'Recherche Projet', href: '#', action: () => setActivePage('project') },
  ]

  // Fonction pour changer de page avec animation
  const changePage = (page: 'news' | 'company' | 'project') => {
    setActivePage(page)
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Effet de fond organique */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          ref={backgroundRef}
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, #06845E 0%, #06b47e 50%, #06845E 100%)`,
            filter: 'blur(80px)',
            transform: 'scale(1.5)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306845E' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Header avec navigation */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Ailancy</span>
              <h1 className="text-2xl font-bold text-[#06845E]">Ailancy</h1>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className={`text-sm font-semibold leading-6 transition-colors ${
                  activePage === (item.name === 'Actualités' ? 'news' : 
                                item.name === 'Recherche Entreprise' ? 'company' : 'project')
                    ? 'text-[#06845E]'
                    : 'text-gray-900 hover:text-[#06845E]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Ailancy</span>
                <h1 className="text-2xl font-bold text-[#06845E]">Ailancy</h1>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        item.action();
                        setMobileMenuOpen(false);
                      }}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        activePage === (item.name === 'Actualités' ? 'news' : 
                                      item.name === 'Recherche Entreprise' ? 'company' : 'project')
                          ? 'text-[#06845E] bg-gray-50'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* Contenu principal avec transitions de page */}
      <main className="pt-24">
        <AnimatePresence mode="wait">
          {activePage === 'news' && (
            <motion.div
              key="news"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative isolate"
            >
              {/* Grille de news */}
              <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-2xl lg:mx-0 mb-12">
                  <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Actualités</h2>
                  <p className="mt-2 text-lg text-gray-600">Restez informé des dernières tendances et innovations.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {newsData.map((news) => (
                    <motion.div
                      key={news.id}
                      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => setSelectedNews(news)}
                    >
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-x-4 text-xs mb-4">
                          <time dateTime={news.date} className="text-gray-500">
                            {new Date(news.date).toLocaleDateString('fr-FR')}
                          </time>
                          <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                            {news.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-[#06845E]">
                          {news.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                          {news.description}
                        </p>
                        {news.author && (
                          <div className="relative mt-6 flex items-center gap-x-4">
                            <img 
                              src={news.author.imageUrl} 
                              alt={news.author.name} 
                              className="h-10 w-10 rounded-full bg-gray-50" 
                            />
                            <div className="text-sm">
                              <p className="font-semibold text-gray-900">{news.author.name}</p>
                              <p className="text-gray-600">{news.author.role}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'company' && (
            <motion.div
              key="company"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative isolate"
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-2xl lg:mx-0 mb-12">
                  <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Recherche Entreprise</h2>
                  <p className="mt-2 text-lg text-gray-600">Trouvez des informations détaillées sur les entreprises qui vous intéressent.</p>
                </div>
                <div className="mx-auto max-w-xl">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="company-search" className="block text-sm font-medium text-gray-700">
                        Nom de l'entreprise
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company-search"
                          id="company-search"
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-[#06845E] focus:ring-[#06845E] sm:text-sm"
                          placeholder="Entrez le nom de l'entreprise"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="rounded-md bg-[#06845E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#06b47e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06845E]"
                      >
                        Rechercher
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'project' && (
            <motion.div
              key="project"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative isolate"
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-2xl lg:mx-0 mb-12">
                  <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Recherche Projet</h2>
                  <p className="mt-2 text-lg text-gray-600">Explorez des projets similaires et trouvez de l'inspiration.</p>
                </div>
                <div className="mx-auto max-w-xl">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="project-search" className="block text-sm font-medium text-gray-700">
                        Nom du projet
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="project-search"
                          id="project-search"
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-[#06845E] focus:ring-[#06845E] sm:text-sm"
                          placeholder="Entrez le nom du projet"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="rounded-md bg-[#06845E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#06b47e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06845E]"
                      >
                        Rechercher
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de détail des news */}
        <AnimatePresence>
          {selectedNews && (
            <Dialog
              as="div"
              className="relative z-50"
              open={!!selectedNews}
              onClose={() => setSelectedNews(null)}
            >
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                      {selectedNews.title}
                    </Dialog.Title>
                    <button
                      onClick={() => setSelectedNews(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img
                      src={selectedNews.imageUrl}
                      alt={selectedNews.title}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-x-4 text-xs mb-4">
                    <time dateTime={selectedNews.date} className="text-gray-500">
                      {new Date(selectedNews.date).toLocaleDateString('fr-FR')}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                      {selectedNews.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{selectedNews.description}</p>
                  {selectedNews.author && (
                    <div className="flex items-center gap-x-4 border-t border-gray-200 pt-4">
                      <img 
                        src={selectedNews.author.imageUrl} 
                        alt={selectedNews.author.name} 
                        className="h-10 w-10 rounded-full bg-gray-50" 
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{selectedNews.author.name}</p>
                        <p className="text-gray-600">{selectedNews.author.role}</p>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </div>
            </Dialog>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}