<template>
     <header class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-6 flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <i class="fas fa-clinic-medical text-white text-xl"></i>
                </div>
                <h1 class="text-2xl font-bold text-indigo-800">AnnaSkin<span class="text-indigo-500">AI</span></h1>
            </div>
            <nav class="hidden md:flex space-x-8">
                <a href="index.html" class="text-indigo-700 font-medium hover:text-indigo-500">Accueil</a>
                <!-- <a href="#fonctionnalité" class="text-gray-600 hover:text-indigo-500">Fonctionnalités</a> -->
                <a href="#fonctionnalité" class="text-gray-600 hover:text-indigo-500">À propos</a>
                <a href="#contact" class="text-gray-600 hover:text-indigo-500">Contact</a>
            </nav>
            <button class="md:hidden text-gray-600">
                <i class="fas fa-bars text-2xl"></i>
            </button>
        </div>
    </header>
</template>

<script setup></script>