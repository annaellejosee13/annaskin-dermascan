<template>
    <section class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div class="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 mb-10 md:mb-0">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">Diagnostique dermatologique intelligent</h2>
                <p class="text-xl mb-8 opacity-90">Analysez vos problèmes de peau en quelques secondes grâce à notre application . Obtenez des diagnostics précis et des recommandations personnalisées.</p>
                <button id="startDiagnosisBtn" class="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
                    Commencer l'analyse <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
            <div class="md:w-1/2 flex justify-center">
                <div class="relative w-full max-w-md">
                    <div class="absolute -top-6 -left-6 w-32 h-32 bg-purple-300 rounded-full opacity-20"></div>
                    <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-300 rounded-full opacity-20"></div>
                    <div class="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div class="bg-gray-100 p-4 flex items-center">
                            <div class="flex space-x-2">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div class="flex-1 text-center text-sm font-medium text-gray-600">AnnaSkin DermaScan AI</div>
                        </div>
                        <div class="p-6">
                            <div class="bg-gray-200 rounded-lg overflow-hidden mb-4">
                                <img src="@/assets/img/AnnaSkin-.png" alt="Exemple de diagnostic" class="w-full h-auto">
                            </div>
                            <div class="bg-indigo-100 text-indigo-800 p-4 rounded-lg">
                                <div class="font-bold mb-2">Résultat probable :</div>
                                <div>Dermatite séborrhéique - 87% de correspondance</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup></script>