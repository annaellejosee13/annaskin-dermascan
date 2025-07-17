<template>
    <section id="diagnosisSection" class="py-16 bg-white hidden">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Analyse dermatologique</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">Téléchargez une photo claire de la zone concernée pour obtenir un diagnostic instantané.</p>
            </div>
            
            <div class="max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-md overflow-hidden">
                <div class="md:flex">
                    <!-- Step 1: Upload -->
                    <div id="step1" class="p-8 md:w-1/2">
                        <h3 class="text-xl font-semibold mb-6 text-gray-800">Étape 1 : Télécharger une photo</h3>
                        
                        <div id="uploadArea" class="upload-area border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition duration-300 mb-6">
                            <i class="fas fa-cloud-upload-alt text-4xl text-indigo-500 mb-4"></i>
                            <p class="text-gray-600 mb-2">Glissez-déposez votre photo ici</p>
                            <p class="text-sm text-gray-500">ou cliquez pour sélectionner</p>
                            <input type="file" id="skinImage" accept="image/*" class="hidden">
                        </div>
                        
                        <div class="mb-6">
                            <label class="block text-gray-700 mb-2">Type de peau</label>
                            <div class="flex space-x-2">
                                <button class="skin-type-btn px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700" data-type="normal">Normale</button>
                                <button class="skin-type-btn px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700" data-type="dry">Sèche</button>
                                <button class="skin-type-btn px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700" data-type="oily">Grasse</button>
                                <button class="skin-type-btn px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700" data-type="mixed">Mixte</button>
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <label class="block text-gray-700 mb-2">Teint de peau</label>
                            <div class="skin-tone-picker h-8 rounded-full mb-2"></div>
                            <div class="flex justify-between text-xs text-gray-600">
                                <span>Clair</span>
                                <span>Moyen</span>
                                <span>Foncé</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Preview Area -->
                    <div id="previewArea" class="hidden md:block md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center items-center">
                        <div class="relative w-full max-w-xs">
                            <div id="imagePreviewContainer" class="bg-white p-4 rounded-lg shadow-md mb-6 hidden">
                                <img id="imagePreview" src="#" alt="Aperçu de l'image" class="w-full h-auto rounded">
                            </div>
                            <div id="defaultPreview" class="text-center">
                                <i class="fas fa-image text-5xl text-gray-400 mb-4"></i>
                                <p class="text-gray-600">Aperçu de votre photo apparaîtra ici</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2: Analyzing (hidden by default) -->
                <div id="step2" class="hidden p-12 text-center">
                    <div class="mb-8">
                        <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-microscope text-3xl text-indigo-600 loading-pulse"></i>
                        </div>
                        <h3 class="text-2xl font-semibold text-gray-800 mb-2">Analyse en cours</h3>
                        <p class="text-gray-600">Notre IA examine votre photo pour détecter les problèmes cutanés...</p>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 max-w-md mx-auto">
                        <div id="progressBar" class="bg-indigo-600 h-2.5 rounded-full" style="width: 0%"></div>
                    </div>
                </div>
                
                <!-- Step 3: Results (hidden by default) -->
                <div id="step3" class="hidden p-8">
                    <div class="text-center mb-8">
                        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-check-circle text-3xl text-green-600"></i>
                        </div>
                        <h3 class="text-2xl font-semibold text-gray-800 mb-2">Analyse terminée</h3>
                        <p class="text-gray-600">Voici les résultats de notre diagnostic</p>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-6 mb-8">
                        <div class="diagnosis-card bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
                            <h4 class="font-bold text-lg text-gray-800 mb-3">Diagnostic principal</h4>
                            <div class="flex items-center mb-3">
                                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                    <i class="fas fa-diagnoses text-indigo-600"></i>
                                </div>
                                <div>
                                    <div class="font-semibold" id="mainDiagnosis">Dermatite atopique</div>
                                    <div class="text-sm text-gray-500" id="diagnosisConfidence">92% de correspondance</div>
                                </div>
                            </div>
                            <p class="text-gray-700 text-sm" id="diagnosisDescription">Inflammation cutanée chronique caractérisée par une peau sèche, des démangeaisons et des rougeurs.</p>
                        </div>
                        
                        <div class="diagnosis-card bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                            <h4 class="font-bold text-lg text-gray-800 mb-3">Diagnostic secondaire</h4>
                            <div class="flex items-center mb-3">
                                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <i class="fas fa-search text-blue-600"></i>
                                </div>
                                <div>
                                    <div class="font-semibold" id="secondaryDiagnosis">Eczéma</div>
                                    <div class="text-sm text-gray-500" id="secondaryConfidence">78% de correspondance</div>
                                </div>
                            </div>
                            <p class="text-gray-700 text-sm" id="secondaryDescription">Affection cutanée provoquant des rougeurs, des démangeaisons et parfois des cloques.</p>
                        </div>
                    </div>
                    
                    <div class="diagnosis-card bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 mb-8">
                        <h4 class="font-bold text-lg text-gray-800 mb-3">Recommandations</h4>
                        <div class="space-y-4" id="recommendations">
                            <div class="flex">
                                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                    <i class="fas fa-prescription-bottle-alt text-purple-600"></i>
                                </div>
                                <div>
                                    <div class="font-medium text-gray-800">Utilisez un hydratant hypoallergénique</div>
                                    <p class="text-gray-600 text-sm">Appliquez 2 fois par jour pour réduire la sécheresse cutanée.</p>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                    <i class="fas fa-hand-sparkles text-purple-600"></i>
                                </div>
                                <div>
                                    <div class="font-medium text-gray-800">Évitez les savons agressifs</div>
                                    <p class="text-gray-600 text-sm">Privilégiez des nettoyants doux sans parfum.</p>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                    <i class="fas fa-user-md text-purple-600"></i>
                                </div>
                                <div>
                                    <div class="font-medium text-gray-800">Consultez un dermatologue</div>
                                    <p class="text-gray-600 text-sm">Pour confirmation du diagnostic et traitement personnalisé.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button class="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition duration-300" onclick="generatePDF()">
                            <i class="fas fa-file-pdf mr-2"></i> Télécharger PDF
                        </button>
                        <button class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition duration-300" onclick="printDiagnosisResults()">
                            <i class="fas fa-print mr-2"></i> Imprimer
                        </button>
                        <button class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition duration-300">
                            <i class="fas fa-redo mr-2"></i> Nouvelle analyse
                        </button>
                    </div>
                </div>
                
                <div class="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                    <button id="backBtn" class="px-4 py-2 text-gray-600 hover:text-indigo-600 hidden">
                        <i class="fas fa-arrow-left mr-2"></i> Retour
                    </button>
                    <button id="nextBtn" class="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                        Suivant <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup></script>
