 document.addEventListener('DOMContentLoaded', function() {
            // Variables
            let currentStep = 1;
            const maxSteps = 3;
            let selectedSkinType = null;
            let selectedImage = null;
            
            // DOM Elements
            const diagnosisSection = document.getElementById('diagnosisSection');
            const startDiagnosisBtn = document.getElementById('startDiagnosisBtn');
            const uploadArea = document.getElementById('uploadArea');
            const skinImageInput = document.getElementById('skinImage');
            const imagePreviewContainer = document.getElementById('imagePreviewContainer');
            const imagePreview = document.getElementById('imagePreview');
            const defaultPreview = document.getElementById('defaultPreview');
            const step1 = document.getElementById('step1');
            const step2 = document.getElementById('step2');
            const step3 = document.getElementById('step3');
            const backBtn = document.getElementById('backBtn');
            const nextBtn = document.getElementById('nextBtn');
            const progressBar = document.getElementById('progressBar');
            const skinTypeBtns = document.querySelectorAll('.skin-type-btn');
            
            // Event Listeners
            startDiagnosisBtn.addEventListener('click', function() {
                diagnosisSection.classList.remove('hidden');
                window.scrollTo({
                    top: diagnosisSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            });
            
            uploadArea.addEventListener('click', function() {
                skinImageInput.click();
            });
            
            skinImageInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        imagePreview.src = event.target.result;
                        imagePreviewContainer.classList.remove('hidden');
                        defaultPreview.classList.add('hidden');
                        selectedImage = file;
                        checkNextButton();
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Drag and drop functionality
            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                uploadArea.classList.add('border-indigo-500', 'bg-indigo-50');
            });
            
            uploadArea.addEventListener('dragleave', function(e) {
                e.preventDefault();
                uploadArea.classList.remove('border-indigo-500', 'bg-indigo-50');
            });
            
            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                uploadArea.classList.remove('border-indigo-500', 'bg-indigo-50');
                
                if (e.dataTransfer.files.length > 0) {
                    const file = e.dataTransfer.files[0];
                    
                    // Check if the file is an image
                    if (!file.type.match('image.*')) {
                        alert('Veuillez sélectionner une image valide.');
                        return;
                    }
                    
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        imagePreview.src = event.target.result;
                        imagePreviewContainer.classList.remove('hidden');
                        defaultPreview.classList.add('hidden');
                        selectedImage = file;
                        checkNextButton();
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Skin type selection
            skinTypeBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    skinTypeBtns.forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
                    this.classList.add('bg-indigo-600', 'text-white');
                    selectedSkinType = this.dataset.type;
                    checkNextButton();
                });
            });
            
            // Navigation buttons
            nextBtn.addEventListener('click', function() {
                if (currentStep === 1) {
                    // Validate step 1
                    if (!selectedImage || !selectedSkinType) {
                        alert('Veuillez télécharger une image et sélectionner votre type de peau.');
                        return;
                    }
                    
                    // Move to step 2
                    step1.classList.add('hidden');
                    step2.classList.remove('hidden');
                    backBtn.classList.remove('hidden');
                    currentStep = 2;
                    
                    // Simulate analysis progress
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += Math.random() * 10;
                        if (progress >= 100) {
                            progress = 100;
                            clearInterval(interval);
                            
                            // After progress completes, move to step 3
                            setTimeout(() => {
                                step2.classList.add('hidden');
                                step3.classList.remove('hidden');
                                currentStep = 3;
                                nextBtn.textContent = 'Terminer';
                                
                                // Generate random diagnosis (demo purposes)
                                const conditions = [
                                    {name: "Dermatite atopique", confidence: "92%", desc: "Inflammation cutanée chronique caractérisée par une peau sèche, des démangeaisons et des rougeurs."},
                                    {name: "Psoriasis", confidence: "85%", desc: "Maladie auto-immune provoquant des plaques rouges et squameuses sur la peau."},
                                    {name: "Acné", confidence: "78%", desc: "Affection cutanée courante caractérisée par des boutons et points noirs."},
                                    {name: "Rosacée", confidence: "72%", desc: "Affection chronique provoquant des rougeurs et des vaisseaux sanguins visibles sur le visage."},
                                    {name: "Eczéma", confidence: "68%", desc: "Affection cutanée provoquant des rougeurs, des démangeaisons et parfois des cloques."}
                                ];
                                
                                const mainCondition = conditions[Math.floor(Math.random() * conditions.length)];
                                let secondaryCondition;
                                do {
                                    secondaryCondition = conditions[Math.floor(Math.random() * conditions.length)];
                                } while (secondaryCondition.name === mainCondition.name);
                                
                                document.getElementById('mainDiagnosis').textContent = mainCondition.name;
                                document.getElementById('diagnosisConfidence').textContent = mainCondition.confidence + " de correspondance";
                                document.getElementById('diagnosisDescription').textContent = mainCondition.desc;
                                
                                document.getElementById('secondaryDiagnosis').textContent = secondaryCondition.name;
                                document.getElementById('secondaryConfidence').textContent = secondaryCondition.confidence + " de correspondance";
                                document.getElementById('secondaryDescription').textContent = secondaryCondition.desc;
                            }, 500);
                        }
                        progressBar.style.width = progress + '%';
                    }, 300);
                    
                } else if (currentStep === 2) {
                    // Shouldn't happen as we automatically move to step 3
                } else if (currentStep === 3) {
                    // Reset the form
                    resetForm();
                }
            });
            
            backBtn.addEventListener('click', function() {
                if (currentStep === 2) {
                    step2.classList.add('hidden');
                    step1.classList.remove('hidden');
                    backBtn.classList.add('hidden');
                    currentStep = 1;
                    nextBtn.textContent = 'Suivant';
                } else if (currentStep === 3) {
                    step3.classList.add('hidden');
                    step2.classList.remove('hidden');
                    currentStep = 2;
                    nextBtn.textContent = 'Suivant';
                }
            });
            
            // Helper functions
            function checkNextButton() {
                if (currentStep === 1 && selectedImage && selectedSkinType) {
                    nextBtn.disabled = false;
                } else {
                    nextBtn.disabled = true;
                }
            }
            
            function generatePDF() {
                try {
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF();
                    
                    // Add logo and header
                    doc.setFontSize(20);
                    doc.setTextColor(79, 70, 229);
                    doc.text('Rapport de Diagnostic DermaScan AI', 105, 20, null, null, 'center');
                    
                    // Add horizontal line
                    doc.setDrawColor(79, 70, 229);
                    doc.setLineWidth(0.5);
                    doc.line(20, 25, 190, 25);
                    
                    // Patient info section
                    doc.setFontSize(12);
                    doc.setTextColor(0, 0, 0);
                    doc.text('Informations Patient:', 20, 40);
                    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 50);
                    doc.text(`Type de peau: ${selectedSkinType ? selectedSkinType.charAt(0).toUpperCase() + selectedSkinType.slice(1) : 'Non spécifié'}`, 20, 60);
                    
                    // Add image if available
                    if (selectedImage) {
                        const imgData = imagePreview.src;
                        const imgWidth = 60;
                        const imgHeight = 60;
                        doc.addImage(imgData, 'JPEG', 20, 70, imgWidth, imgHeight);
                    }
                    
                    // Main diagnosis
                    doc.setFontSize(14);
                    doc.setTextColor(79, 70, 229);
                    doc.text('Diagnostic Principal:', 20, 150);
                    doc.setFontSize(12);
                    doc.setTextColor(0, 0, 0);
                    doc.text(document.getElementById('mainDiagnosis').textContent, 20, 160);
                    doc.text(document.getElementById('diagnosisConfidence').textContent, 20, 170);
                    doc.text(document.getElementById('diagnosisDescription').textContent, 20, 180, { maxWidth: 170 });
                    
                    // Secondary diagnosis
                    doc.setFontSize(14);
                    doc.setTextColor(79, 70, 229);
                    doc.text('Diagnostic Secondaire:', 20, 210);
                    doc.setFontSize(12);
                    doc.setTextColor(0, 0, 0);
                    doc.text(document.getElementById('secondaryDiagnosis').textContent, 20, 220);
                    doc.text(document.getElementById('secondaryConfidence').textContent, 20, 230);
                    doc.text(document.getElementById('secondaryDescription').textContent, 20, 240, { maxWidth: 170 });
                    
                    // Recommendations section
                    doc.setFontSize(14);
                    doc.setTextColor(79, 70, 229);
                    doc.text('Recommandations:', 20, 270);
                    
                    let yPosition = 280;
                    document.querySelectorAll('#recommendations > div').forEach(rec => {
                        const title = rec.querySelector('div:nth-child(2) > div').textContent;
                        const description = rec.querySelector('div:nth-child(2) > p').textContent;
                        
                        // Add bullet point
                        doc.setFontSize(12);
                        doc.setTextColor(0, 0, 0);
                        doc.text('• ' + title, 25, yPosition);
                        
                        // Add description
                        doc.setFontSize(10);
                        doc.setTextColor(100, 100, 100);
                        const splitDesc = doc.splitTextToSize(description, 170);
                        doc.text(splitDesc, 30, yPosition + 7);
                        
                        yPosition += 7 + (splitDesc.length * 5) + 5;
                        
                        // Add page break if needed
                        if (yPosition > 270) {
                            doc.addPage();
                            yPosition = 20;
                        }
                    });
                    
                    // Footer
                    doc.setFontSize(10);
                    doc.setTextColor(100, 100, 100);
                    doc.text('Ce rapport est généré automatiquement par DermaScan AI et ne remplace pas une consultation médicale.', 105, 290, null, null, 'center');
                    doc.text('Pour toute question, contactez-nous à contact@dermascan.ai', 105, 295, null, null, 'center');
                    
                    // Save the PDF with a timestamp in filename
                    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                    doc.save(`Diagnostic_DermaScan_${timestamp}.pdf`);
                    
                } catch (error) {
                    console.error('Erreur lors de la génération du PDF:', error);
                    alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
                }
            }

            function printDiagnosisResults() {
                // Offer choice between print and PDF
                if (confirm('Voulez-vous générer un PDF ou imprimer directement?\n\nOK pour PDF - Annuler pour Imprimer')) {
                    generatePDF();
                } else {
                    // Original print functionality
                    const printContent = `
                        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
                            <h1 style="color: #4f46e5; text-align: center; margin-bottom: 30px;">Résultats du Diagnostic DermaScan AI</h1>
                            
                            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                <h2 style="color: #4f46e5; margin-bottom: 15px;">Diagnostic Principal</h2>
                                <p style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">${document.getElementById('mainDiagnosis').textContent}</p>
                                <p style="color: #6b7280; margin-bottom: 15px;">${document.getElementById('diagnosisConfidence').textContent}</p>
                                <p style="margin-bottom: 0;">${document.getElementById('diagnosisDescription').textContent}</p>
                            </div>
                            
                            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                <h2 style="color: #4f46e5; margin-bottom: 15px;">Diagnostic Secondaire</h2>
                                <p style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">${document.getElementById('secondaryDiagnosis').textContent}</p>
                                <p style="color: #6b7280; margin-bottom: 15px;">${document.getElementById('secondaryConfidence').textContent}</p>
                                <p style="margin-bottom: 0;">${document.getElementById('secondaryDescription').textContent}</p>
                            </div>
                            
                            <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
                                <h2 style="color: #4f46e5; margin-bottom: 15px;">Recommandations</h2>
                                ${document.getElementById('recommendations').innerHTML}
                            </div>
                            
                            <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px;">
                                <p>Généré par DermaScan AI - ${new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    `;
                    
                    const printWindow = window.open('', '', 'width=800,height=600');
                    printWindow.document.write(printContent);
                    printWindow.document.close();
                    printWindow.focus();
                    
                    setTimeout(() => {
                        printWindow.print();
                        printWindow.close();
                    }, 500);
                }
            }

            function resetForm() {
                // Reset all form elements
                skinImageInput.value = '';
                imagePreview.src = '#';
                imagePreviewContainer.classList.add('hidden');
                defaultPreview.classList.remove('hidden');
                selectedImage = null;
                
                skinTypeBtns.forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
                selectedSkinType = null;
                
                progressBar.style.width = '0%';
                
                // Reset steps
                step3.classList.add('hidden');
                step2.classList.add('hidden');
                step1.classList.remove('hidden');
                backBtn.classList.add('hidden');
                nextBtn.textContent = 'Suivant';
                currentStep = 1;
                
                // Scroll to top of diagnosis section
                window.scrollTo({
                    top: diagnosisSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });