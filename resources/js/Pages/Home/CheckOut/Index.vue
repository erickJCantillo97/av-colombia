<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-5 px-4 sm:px-6 lg:px-8">

        <!-- Barra superior compacta -->
        <div class="max-w-7xl mx-auto mb-4 flex items-center justify-between">
            <a :href="route('show.services', props.service.slug)"
                class="group flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span class="font-medium">Volver</span>
            </a>
            <div class="text-center">
                <h1 class="text-xl font-bold text-gray-900">Finalizar Reserva</h1>
                <p class="text-xs text-gray-500">{{ formReserva.service_name }}</p>
            </div>
            <div class="w-16"></div>
        </div>

        <div class="max-w-7xl mx-auto">
            <form class="lg:grid lg:grid-cols-3 lg:gap-6 pb-32 lg:pb-0" @submit.prevent="handleSubmit">

                <!-- ── Columna izquierda ── -->
                <div class="lg:col-span-2 space-y-4">

                    <!-- Card 1: Pasajero -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div class="flex items-center gap-2 px-5 py-3 bg-indigo-50 border-b border-indigo-100">
                            <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <h2 class="text-sm font-semibold text-indigo-800 uppercase tracking-wide">Datos del
                                pasajero</h2>
                        </div>

                        <div class="p-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <!-- Nombres -->
                            <div class="col-span-2 sm:col-span-2">
                                <Input label="Nombres" v-model="formReserva.cliente_name" :required="true"
                                    @blur="validateField('cliente_name')" @input="validateField('cliente_name')" />
                                <p v-if="fieldErrors.cliente_name" class="text-red-500 text-xs mt-0.5">
                                    {{ fieldErrors.cliente_name }}</p>
                                <p v-else-if="fieldValid.cliente_name" class="text-green-600 text-xs mt-0.5">✓
                                    Válido</p>
                            </div>
                            <!-- Apellidos -->
                            <div class="col-span-2 sm:col-span-2">
                                <Input label="Apellidos" v-model="formReserva.cliente_last_name" :required="true"
                                    @blur="validateField('cliente_last_name')"
                                    @input="validateField('cliente_last_name')" />
                                <p v-if="fieldErrors.cliente_last_name" class="text-red-500 text-xs mt-0.5">
                                    {{ fieldErrors.cliente_last_name }}</p>
                                <p v-else-if="fieldValid.cliente_last_name" class="text-green-600 text-xs mt-0.5">✓
                                    Válido</p>
                            </div>
                            <!-- Correo -->
                            <div class="col-span-2 sm:col-span-2">
                                <Input label="Correo" v-model="formReserva.cliente_email" type="email"
                                    :required="true" @blur="validateField('cliente_email')"
                                    @input="validateField('cliente_email')" />
                                <p v-if="fieldErrors.cliente_email" class="text-red-500 text-xs mt-0.5">
                                    {{ fieldErrors.cliente_email }}</p>
                                <p v-else-if="fieldValid.cliente_email" class="text-green-600 text-xs mt-0.5">✓
                                    Válido</p>
                            </div>
                            <!-- Teléfono -->
                            <div class="col-span-2 sm:col-span-2">
                                <label class="text-sm font-medium text-gray-700 block mb-1">Teléfono</label>
                                <div class="flex gap-1.5">
                                    <div class="relative w-32 flex-shrink-0">
                                        <input type="text" v-model="countrySearch"
                                            @focus="showCountryDropdown = true" @blur="hideCountryDropdown"
                                            :placeholder="selectedCountry ? `${selectedCountry.flag} ${selectedCountry.dial}` : 'País'"
                                            class="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                                        <div v-if="showCountryDropdown"
                                            class="absolute z-50 w-72 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-52 overflow-y-auto">
                                            <div v-for="country in filteredCountries" :key="country.code"
                                                @mousedown.prevent="selectCountry(country)"
                                                class="px-3 py-1.5 hover:bg-indigo-50 cursor-pointer flex items-center gap-2 text-sm">
                                                <span>{{ country.flag }}</span>
                                                <span class="font-medium">{{ country.dial }}</span>
                                                <span class="text-gray-500 text-xs truncate">{{ country.name
                                                    }}</span>
                                            </div>
                                            <div v-if="filteredCountries.length === 0"
                                                class="px-3 py-2 text-gray-500 text-sm text-center">Sin
                                                resultados</div>
                                        </div>
                                    </div>
                                    <input type="number" v-model="phoneNumber"
                                        @blur="validateField('cliente_phone')"
                                        @input="validateField('cliente_phone')" placeholder="Número" required
                                        class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                                </div>
                                <p v-if="fieldErrors.cliente_phone" class="text-red-500 text-xs mt-0.5">
                                    {{ fieldErrors.cliente_phone }}</p>
                                <p v-else-if="fieldValid.cliente_phone" class="text-green-600 text-xs mt-0.5">✓
                                    Válido</p>
                            </div>
                            <!-- Hotel -->
                            <div class="col-span-2 sm:col-span-2">
                                <Input label="Hotel / Alojamiento" v-model="formReserva.cliente_building"
                                    :required="true" />
                            </div>
                            <!-- Ciudad -->
                            <div class="col-span-2 sm:col-span-2">
                                <Input label="País o Ciudad de Origen" v-model="formReserva.cliente_city"
                                    :required="true" />
                            </div>
                        </div>
                    </div>

                    <!-- Card 2: Pago (todo en uno) -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div class="flex items-center gap-2 px-5 py-3 bg-green-50 border-b border-green-100">
                            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <h2 class="text-sm font-semibold text-green-800 uppercase tracking-wide">Método de Pago
                            </h2>
                        </div>

                        <div class="p-5 space-y-5">
                            <!-- Selector de método (horizontal) -->
                            <fieldset>
                                <RadioGroup v-model="selectedDeliveryMethod" class="grid grid-cols-3 gap-3">
                                    <RadioGroupOption as="template" v-for="deliveryMethod in deliveryMethods"
                                        :key="deliveryMethod.id" :value="deliveryMethod"
                                        v-slot="{ active, checked }">
                                        <div :class="[
                                            checked ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-indigo-300',
                                            'relative flex flex-col items-center text-center cursor-pointer rounded-xl border-2 p-3 transition-all duration-200 focus:outline-none',
                                        ]">
                                            <svg v-if="deliveryMethod.id === 2" class="w-6 h-6 mb-1"
                                                :class="checked ? 'text-indigo-600' : 'text-gray-400'" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            <svg v-else-if="deliveryMethod.id === 1" class="w-6 h-6 mb-1"
                                                :class="checked ? 'text-green-600' : 'text-gray-400'" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <svg v-else class="w-6 h-6 mb-1"
                                                :class="checked ? 'text-blue-600' : 'text-gray-400'" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span class="text-xs font-semibold leading-tight"
                                                :class="checked ? 'text-indigo-900' : 'text-gray-700'">{{
                                                    deliveryMethod.title }}</span>
                                            <span v-if="checked"
                                                class="absolute top-1.5 right-1.5 w-3 h-3 bg-indigo-600 rounded-full flex items-center justify-center">
                                                <span class="w-1.5 h-1.5 bg-white rounded-full"></span>
                                            </span>
                                        </div>
                                    </RadioGroupOption>
                                </RadioGroup>
                            </fieldset>

                            <!-- Info: Efectivo -->
                            <div v-if="selectedDeliveryMethod.id === 1"
                                class="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <p class="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">📍
                                    Dirección de oficina</p>
                                <p class="text-sm text-gray-700 font-medium">Barrio Crespo, Carrera 1 No. 62-105
                                </p>
                                <p class="text-xs text-gray-500 mt-1">Frente al CAI de policía de Crespo — Av.
                                    Santander</p>
                                <p class="text-xs text-blue-600 mt-2">Recibirás el comprobante y detalles por
                                    correo.</p>
                            </div>

                            <!-- Info: Giros y Consignaciones -->
                            <div v-if="selectedDeliveryMethod.id === 3" class="space-y-3">
                                <div class="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                    <p class="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-2">
                                        👤 Titular</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            class="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg font-semibold">Melissa
                                            Zurita</span>
                                        <span
                                            class="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg font-semibold">CC:
                                            1047475135</span>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <div class="bg-white border border-gray-200 rounded-xl p-3">
                                        <p class="text-indigo-600 font-bold text-sm mb-1">Bancolombia</p>
                                        <p class="text-gray-500 text-xs">Cta. Ahorros</p>
                                        <p class="text-gray-900 font-semibold text-sm mt-0.5">678 0000 8810</p>
                                    </div>
                                    <div class="bg-white border border-gray-200 rounded-xl p-3">
                                        <p class="text-gray-700 font-bold text-xs mb-2">Giros disponibles:</p>
                                        <div class="flex gap-3 items-center">
                                            <img src="/exito.png" alt="Éxito" class="w-10 h-10 object-contain">
                                            <img src="/western.png" alt="Western Union"
                                                class="w-10 h-10 object-contain rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Abono (Tarjeta o Giros) -->
                            <div v-if="selectedDeliveryMethod.id === 2 || selectedDeliveryMethod.id === 3">
                                <div class="flex items-center gap-2 mb-3">
                                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p class="text-sm font-semibold text-gray-700">¿Cuánto deseas pagar ahora?</p>
                                </div>
                                <div class="grid grid-cols-4 gap-2">
                                    <button v-for="opcion in abonoOpciones" :key="opcion.porcentaje" type="button"
                                        @click="abonoPercentage = opcion.porcentaje" :class="[
                                            abonoPercentage === opcion.porcentaje
                                                ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                                                : 'border-gray-200 hover:border-emerald-300',
                                            'relative flex flex-col items-center justify-center rounded-xl border-2 py-3 px-1 transition-all duration-150'
                                        ]">
                                        <span class="text-lg font-bold"
                                            :class="abonoPercentage === opcion.porcentaje ? 'text-emerald-700' : 'text-gray-700'">{{
                                                opcion.porcentaje }}%</span>
                                        <span class="text-xs mt-0.5 text-center leading-tight"
                                            :class="abonoPercentage === opcion.porcentaje ? 'text-emerald-600' : 'text-gray-400'">{{
                                                formatCurrency(formReserva.total_real * opcion.porcentaje / 100)
                                            }}</span>
                                        <svg v-if="abonoPercentage === opcion.porcentaje"
                                            class="absolute top-1 right-1 w-3 h-3 text-emerald-600"
                                            fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <p v-if="abonoPercentage && abonoPercentage < 100"
                                    class="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                    Abono: <strong>{{ formatCurrency(formReserva.total_real * abonoPercentage /
                                        100) }}</strong> · Saldo pendiente: <strong>{{
                                            formatCurrency(formReserva.total_real * (100 - abonoPercentage) / 100)
                                        }}</strong>
                                </p>
                            </div>

                            <!-- Comprobante (solo Giros) -->
                            <div v-if="selectedDeliveryMethod.id === 3">
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center gap-2">
                                        <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p class="text-sm font-semibold text-gray-700">Comprobante de pago
                                            <span class="text-red-500">*</span>
                                        </p>
                                    </div>
                                    <span v-if="filePreview"
                                        class="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-medium">✓
                                        Cargado</span>
                                </div>

                                <!-- Preview del archivo -->
                                <div v-if="filePreview"
                                    class="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                                    <div class="flex-shrink-0">
                                        <img v-if="filePreview !== 'pdf' && filePreview !== 'file'"
                                            :src="filePreview" alt="Preview"
                                            class="w-14 h-14 rounded-lg object-cover border border-purple-300">
                                        <div v-else-if="filePreview === 'pdf'"
                                            class="w-14 h-14 rounded-lg bg-red-100 border border-red-300 flex items-center justify-center">
                                            <svg class="w-7 h-7 text-red-600" fill="currentColor"
                                                viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div v-else
                                            class="w-14 h-14 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center">
                                            <svg class="w-7 h-7 text-gray-500" fill="currentColor"
                                                viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-800 truncate">{{ fileName }}</p>
                                        <button @click.prevent="removeFile" type="button"
                                            class="text-xs text-red-500 hover:text-red-700 font-medium mt-1">Eliminar</button>
                                    </div>
                                </div>

                                <!-- Dropzone -->
                                <label v-if="!filePreview"
                                    class="flex items-center justify-center gap-3 w-full h-20 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-purple-50 hover:border-purple-300 transition-colors">
                                    <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <div>
                                        <p class="text-sm text-gray-600"><span class="font-semibold text-indigo-600">Click para subir</span> o arrastra</p>
                                        <p class="text-xs text-gray-400">PNG, JPG o PDF (máx. 10MB)</p>
                                    </div>
                                    <input @change="previewFiles" type="file" class="hidden" accept="image/*,.pdf" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ── Columna derecha: Resumen ── -->
                <div class="lg:col-span-1 mt-4 lg:mt-0">
                    <div class="sticky top-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                        <!-- Header resumen -->
                        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 text-white">
                            <p class="text-xs font-semibold uppercase tracking-wide opacity-80">Resumen</p>
                            <p class="text-base font-bold mt-0.5 truncate">{{ formReserva.service_name }}</p>
                            <div class="flex gap-4 mt-2 text-xs opacity-90">
                                <span class="flex items-center gap-1">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
                                    </svg>
                                    {{ formReserva.adults + formReserva.children + formReserva.infants }}
                                    {{ (formReserva.adults + formReserva.children + formReserva.infants) === 1 ?
                                        'Pasajero' : 'Pasajeros' }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {{ formatDate(formReserva.date) }}
                                </span>
                            </div>
                        </div>

                        <!-- Totales -->
                        <div class="px-5 py-4 space-y-2 border-b border-gray-100">
                            <div class="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span class="font-medium">{{ formatCurrency(formReserva.price_service) }}</span>
                            </div>
                            <div class="flex justify-between text-sm text-gray-600">
                                <span>Extras</span>
                                <span class="font-medium">{{ formatCurrency(formReserva.extras) }}</span>
                            </div>
                            <div class="flex justify-between items-center pt-2 border-t border-gray-200">
                                <span class="text-sm font-medium text-gray-500">Costo del servicio</span>
                                <span class="text-sm font-semibold text-gray-700">{{
                                    formatCurrency(formReserva.total_real) }}</span>
                            </div>
                            <!-- Monto a pagar ahora -->
                            <div class="flex justify-between items-center pt-2 border-t-2 border-indigo-200 mt-1">
                                <div>
                                    <span class="font-bold text-gray-900 block">A pagar ahora</span>
                                    <span v-if="abonoPercentage && abonoPercentage < 100"
                                        class="text-xs text-amber-600">Saldo: {{ formatCurrency(formReserva.total_real * (100 - abonoPercentage) / 100) }} antes del servicio</span>
                                </div>
                                <span class="text-2xl font-bold text-indigo-600">{{ formatCurrency(montoPagar) }}</span>
                            </div>
                        </div>

                        <!-- Botones y badges -->
                        <div class="px-5 py-4 space-y-3">
                            <!-- Aviso comprobante -->
                            <div v-if="selectedDeliveryMethod.id === 3 && !filePreview"
                                class="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                </svg>
                                <span>Sube el <strong>comprobante</strong> para continuar.</span>
                            </div>

                            <!-- Confirmar -->
                            <button
                                :disabled="formReserva.total_real == 0 || isLoading || (selectedDeliveryMethod.id === 3 && !filePreview)"
                                type="submit"
                                class="reserve-button w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group">
                                <span v-if="!isLoading" class="relative z-10 flex items-center justify-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Confirmar Reserva
                                </span>
                                <span v-else class="relative z-10 flex items-center justify-center gap-2">
                                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Procesando...
                                </span>
                                <span
                                    class="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                            </button>

                            <!-- Explorar -->
                            <a :href="route('welcome')"
                                class="w-full border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                Explorar más tours
                            </a>

                            <!-- Políticas -->
                            <p class="text-xs text-center text-gray-400">
                                Al confirmar aceptas nuestras
                                <a @click="showPoliciesModal = true"
                                    class="text-indigo-500 cursor-pointer hover:text-indigo-700 underline">Políticas
                                    de Cancelación</a>
                            </p>

                            <!-- Trust badges -->
                            <div class="flex items-center justify-center gap-4 pt-1 border-t border-gray-100">
                                <div class="flex items-center gap-1 text-xs text-gray-500">
                                    <svg class="w-3.5 h-3.5 text-green-500" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Seguro
                                </div>
                                <div class="flex items-center gap-1 text-xs text-gray-500">
                                    <svg class="w-3.5 h-3.5 text-blue-500" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    SSL
                                </div>
                                <div class="flex items-center gap-1 text-xs text-gray-500">
                                    <svg class="w-3.5 h-3.5 text-purple-500" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Rápido
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <!-- Sticky footer para móvil -->
            <div
                class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-4 z-50 animate-slide-in-up">
                <div class="flex items-center justify-between mb-2">
                    <div>
                        <span class="text-sm text-gray-600">A pagar ahora</span>
                        <span v-if="abonoPercentage && abonoPercentage < 100"
                            class="block text-xs text-amber-600">{{ abonoPercentage }}% del total</span>
                    </div>
                    <span class="text-2xl font-bold text-purple-600">{{ formatCurrency(montoPagar) }}</span>
                </div>
                <button @click="handleSubmit" :disabled="isLoading || formReserva.total_real == 0 || (selectedDeliveryMethod.id === 3 && !filePreview)"
                    class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <svg v-if="!isLoading" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else class="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    {{ isLoading ? 'Procesando...' : 'Confirmar Reserva' }}
                </button>
            </div>
        </div>

        <!-- Modal de Políticas -->
        <Transition name="modal">
            <div v-if="showPoliciesModal" class="fixed inset-0 z-50 overflow-y-auto"
                @click.self="showPoliciesModal = false">
                <div class="flex min-h-screen items-center justify-center p-4">
                    <!-- Overlay -->
                    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        @click="showPoliciesModal = false"></div>

                    <!-- Modal Content -->
                    <div
                        class="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden transform transition-all">
                        <!-- Header -->
                        <div
                            class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 class="text-xl font-bold text-white">Políticas de Privacidad y Cancelaciones</h3>
                            </div>
                            <button @click="showPoliciesModal = false"
                                class="text-white hover:text-gray-200 transition-colors">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Content -->
                        <div class="px-6 py-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
                            <!-- Introducción -->
                            <div class="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-600">
                                <p class="text-sm text-gray-700">
                                    Al realizar una reserva con nosotros, usted acepta cumplir con las siguientes
                                    políticas y condiciones de servicio.
                                </p>
                            </div>

                            <!-- Política de Cancelaciones -->
                            <section>
                                <h4 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Política de Cancelaciones
                                </h4>
                                <div class="space-y-3 text-sm text-gray-700">
                                    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                        <p class="font-semibold text-red-900 mb-2">⚠️ Importante:</p>
                                        <p>Las cancelaciones deben realizarse con <strong>al menos 24 horas de
                                                anticipación</strong> antes del inicio del servicio contratado.</p>
                                    </div>
                                    <ul class="list-disc list-inside space-y-2 ml-2">
                                        <li>Cancelaciones con más de 24 horas: <strong>Reembolso del 100%</strong> del
                                            monto pagado.
                                        </li>
                                        <li>Cancelaciones entre 24 y 12 horas: <strong>Reembolso del 50%</strong> del
                                            monto pagado.
                                        </li>
                                        <li>Cancelaciones con menos de 12 horas: <strong>No se realizará
                                                reembolso</strong>.
                                        </li>
                                        <li>En caso de no presentarse (No-Show): <strong>No se realizará
                                                reembolso</strong>.
                                        </li>
                                    </ul>
                                    <p class="text-xs text-gray-600 mt-3">
                                        Los reembolsos se procesarán en un plazo de 5 a 10 días hábiles, dependiendo del
                                        método de pago utilizado.
                                    </p>
                                </div>
                            </section>

                            <!-- Política de Privacidad -->
                            <section>
                                <h4 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Política de Privacidad
                                </h4>
                                <div class="space-y-3 text-sm text-gray-700">
                                    <p>Sus datos personales serán tratados de acuerdo con la Ley 1581 de 2012 de
                                        Protección de Datos Personales de Colombia.</p>
                                    <ul class="list-disc list-inside space-y-2 ml-2">
                                        <li>Recopilamos información personal únicamente para procesar su reserva y
                                            mejorar nuestros servicios.
                                        </li>
                                        <li>No compartimos su información con terceros sin su consentimiento expreso.
                                        </li>
                                        <li>Implementamos medidas de seguridad para proteger sus datos personales.</li>
                                        <li>Usted tiene derecho a acceder, actualizar o eliminar su información en
                                            cualquier momento.
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            <!-- Protección de Menores -->
                            <section>
                                <h4 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    Protección de Menores y Compromiso Legal
                                </h4>
                                <div class="space-y-3 text-sm text-gray-700">
                                    <div class="bg-red-50 border-2 border-red-600 p-4 rounded-lg">
                                        <p class="font-bold text-red-900 mb-3">🛡️ TOLERANCIA CERO</p>
                                        <p class="mb-2">Nuestra empresa mantiene una política de <strong>TOLERANCIA
                                                CERO</strong> ante cualquier forma de explotación, abuso o trata de
                                            personas, especialmente de menores de edad.</p>
                                    </div>
                                    <p class="font-semibold">Cumplimos estrictamente con:</p>
                                    <ul class="list-disc list-inside space-y-2 ml-2">
                                        <li><strong>Ley 679 de 2001:</strong> Prevención y lucha contra la explotación,
                                            la pornografía y el turismo sexual con menores.
                                        </li>
                                        <li><strong>Ley 1336 de 2009:</strong> Adiciona y robustece la Ley 679 de 2001
                                            en materia de protección infantil.
                                        </li>
                                        <li><strong>Ley 985 de 2005:</strong> Adopción de medidas contra la trata de
                                            personas y normas para su prevención.
                                        </li>
                                    </ul>
                                    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-3">
                                        <p class="text-xs font-semibold text-yellow-900">
                                            ⚖️ Cualquier comportamiento sospechoso o ilegal será reportado
                                            inmediatamente a las autoridades competentes.
                                            Colaboramos activamente con las fuerzas de seguridad para garantizar la
                                            protección de todos nuestros pasajeros.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <!-- Términos Adicionales -->
                            <section>
                                <h4 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Términos Adicionales
                                </h4>
                                <ul class="list-disc list-inside space-y-2 ml-2 text-sm text-gray-700">
                                    <li>Nos reservamos el derecho de modificar itinerarios por causas de fuerza mayor o
                                        condiciones climáticas adversas.
                                    </li>
                                    <li>Es responsabilidad del pasajero presentarse puntualmente en el punto de
                                        encuentro acordado.
                                    </li>
                                    <li>Se requiere presentar documento de identidad al momento de abordar el
                                        servicio.
                                    </li>
                                    <li>El pasajero debe informar sobre condiciones médicas especiales que puedan
                                        afectar el servicio.
                                    </li>
                                </ul>
                            </section>

                            <!-- Contacto -->
                            <section
                                class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                                <h4 class="text-sm font-bold text-gray-900 mb-2">📞 ¿Preguntas sobre nuestras
                                    políticas?</h4>
                                <p class="text-xs text-gray-700">
                                    Contáctanos en cualquier momento. Estamos aquí para ayudarte y resolver todas tus
                                    dudas antes de confirmar tu reserva.
                                </p>
                            </section>
                        </div>

                        <!-- Footer -->
                        <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                            <button @click="showPoliciesModal = false"
                                class="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import Input from "@/Components/Customs/Input.vue";
import searchStore from "@/store/searchStore.js";
import { router } from "@inertiajs/vue3";
import Swal from "sweetalert2";
import state from "@/store/searchStore.js";
import * as serviceModel from "@/composable/useCommonUtilities.js";

// #endregion
const props = defineProps({
    service: Object,
    availabilities: Array
});

const formReserva = ref({
    adults: searchStore.guests.value.adults,
    children: searchStore.guests.value.children,
    infants: searchStore.guests.value.infants,
    price_service: 0,
    service_name: props.service.title,
    service_id: props.service.id,
    total_real: 0,
    payment_method: 0,
    cliente_name: "",
    cliente_last_name: "",
    cliente_email: "",
    cliente_phone: "",
    cliente_building: "",
    cliente_city: "",
    extras: 0,
    soporte: '',
    date: searchStore.checkin.value,
    hour: searchStore.checkin.value,
    origin: "",
    destination: "",
})

function getPriceAvailabilities() {
    if (!Array.isArray(props.availabilities) || props.availabilities.length === 0) {
        return 0;
    }

    const checkinTimestamp = new Date(state.checkin.value).setHours(0, 0, 0, 0);
    const checkoutTimestamp = new Date(state.checkout.value).setHours(0, 0, 0, 0);

    const precios = props.availabilities.find((availability) => {
        const startTimestamp = new Date(availability.start_date).setHours(0, 0, 0, 0);
        const endTimestamp = new Date(availability.end_date).setHours(0, 0, 0, 0);

        return startTimestamp <= checkinTimestamp && endTimestamp >= checkoutTimestamp;
    })?.precies || [];

    console.log('Precios encontrados:', precios);

    if (!precios) return 0;
    console.log(precios);
    return precios.reduce((max, obj) => obj.value > max.value ? obj : max, precios[0]).value;
}


function getPrice() {
    const maxCapacity = parseInt(props.service.capacidad_max)
    if (props.service.type === 'TOUR') {
        formReserva.value.price_service = getPriceAvailabilities() * (formReserva.value.adults + formReserva.value.children);
    } else if (props.service.type === 'EMBARCACION') {
        formReserva.value.price_service = getPriceAvailabilities();
    }
    if (props.service.type === 'TRANSFER') {
        formReserva.value.price_service = getPriceAvailabilities() * Math.ceil((formReserva.value.adults + formReserva.value.children) / maxCapacity);
    }
    formReserva.value.total_real = formReserva.value.price_service;
    return getPriceAvailabilities() * formReserva.adults;
}

onMounted(() => {
    getPrice();
    // Seleccionar Colombia por defecto
    selectedCountry.value = countryCodes.value.find(c => c.code === 'CO');
})

const soporte = ref('');
const isLoading = ref(false);
const abonoPercentage = ref(null);
const abonoOpciones = [
    { porcentaje: 10, label: 'Abono' },
    { porcentaje: 20, label: 'Abono' },
    { porcentaje: 30, label: 'Abono' },
    { porcentaje: 100, label: 'Pago total' },
];

const montoPagar = computed(() => {
    if (abonoPercentage.value && (selectedDeliveryMethod.value.id === 2 || selectedDeliveryMethod.value.id === 3)) {
        return formReserva.value.total_real * abonoPercentage.value / 100;
    }
    return formReserva.value.total_real;
});
const showPoliciesModal = ref(false);
const filePreview = ref(null);
const fileName = ref('');
const sendWhatsApp = ref(false);
const countryCode = ref('+57'); // Colombia por defecto
const phoneNumber = ref('');
const countrySearch = ref('');
const showCountryDropdown = ref(false);
const selectedCountry = ref(null);
const fieldErrors = ref({
    cliente_name: '',
    cliente_last_name: '',
    cliente_email: '',
    cliente_phone: ''
});
const fieldValid = ref({
    cliente_name: false,
    cliente_last_name: false,
    cliente_email: false,
    cliente_phone: false
});

// Lista completa de códigos de país
const countryCodes = ref([
    { code: 'CO', dial: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: 'US', dial: '+1', flag: '🇺🇸', name: 'Estados Unidos' },
    { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canadá' },
    { code: 'MX', dial: '+52', flag: '🇲🇽', name: 'México' },
    { code: 'AR', dial: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: 'BR', dial: '+55', flag: '🇧🇷', name: 'Brasil' },
    { code: 'CL', dial: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: 'PE', dial: '+51', flag: '🇵🇪', name: 'Perú' },
    { code: 'EC', dial: '+593', flag: '🇪🇨', name: 'Ecuador' },
    { code: 'VE', dial: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { code: 'PA', dial: '+507', flag: '🇵🇦', name: 'Panamá' },
    { code: 'CR', dial: '+506', flag: '🇨🇷', name: 'Costa Rica' },
    { code: 'DO', dial: '+1', flag: '🇩🇴', name: 'República Dominicana' },
    { code: 'ES', dial: '+34', flag: '🇪🇸', name: 'España' },
    { code: 'FR', dial: '+33', flag: '🇫🇷', name: 'Francia' },
    { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Alemania' },
    { code: 'IT', dial: '+39', flag: '🇮🇹', name: 'Italia' },
    { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'Reino Unido' },
    { code: 'CN', dial: '+86', flag: '🇨🇳', name: 'China' },
    { code: 'JP', dial: '+81', flag: '🇯🇵', name: 'Japón' },
    { code: 'KR', dial: '+82', flag: '🇰🇷', name: 'Corea del Sur' },
    { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: 'NZ', dial: '+64', flag: '🇳🇿', name: 'Nueva Zelanda' },
    { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India' },
    { code: 'RU', dial: '+7', flag: '🇷🇺', name: 'Rusia' },
    { code: 'AF', dial: '+93', flag: '🇦🇫', name: 'Afganistán' },
    { code: 'AL', dial: '+355', flag: '🇦🇱', name: 'Albania' },
    { code: 'DZ', dial: '+213', flag: '🇩🇿', name: 'Argelia' },
    { code: 'AD', dial: '+376', flag: '🇦🇩', name: 'Andorra' },
    { code: 'AO', dial: '+244', flag: '🇦🇴', name: 'Angola' },
    { code: 'AT', dial: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: 'BE', dial: '+32', flag: '🇧🇪', name: 'Bélgica' },
    { code: 'BO', dial: '+591', flag: '🇧🇴', name: 'Bolivia' },
    { code: 'BA', dial: '+387', flag: '🇧🇦', name: 'Bosnia y Herzegovina' },
    { code: 'BG', dial: '+359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: 'CU', dial: '+53', flag: '🇨🇺', name: 'Cuba' },
    { code: 'CY', dial: '+357', flag: '🇨🇾', name: 'Chipre' },
    { code: 'CZ', dial: '+420', flag: '🇨🇿', name: 'República Checa' },
    { code: 'DK', dial: '+45', flag: '🇩🇰', name: 'Dinamarca' },
    { code: 'EG', dial: '+20', flag: '🇪🇬', name: 'Egipto' },
    { code: 'SV', dial: '+503', flag: '🇸🇻', name: 'El Salvador' },
    { code: 'FI', dial: '+358', flag: '🇫🇮', name: 'Finlandia' },
    { code: 'GR', dial: '+30', flag: '🇬🇷', name: 'Grecia' },
    { code: 'GT', dial: '+502', flag: '🇬🇹', name: 'Guatemala' },
    { code: 'HN', dial: '+504', flag: '🇭🇳', name: 'Honduras' },
    { code: 'HU', dial: '+36', flag: '🇭🇺', name: 'Hungría' },
    { code: 'IS', dial: '+354', flag: '🇮🇸', name: 'Islandia' },
    { code: 'ID', dial: '+62', flag: '🇮🇩', name: 'Indonesia' },
    { code: 'IR', dial: '+98', flag: '🇮🇷', name: 'Irán' },
    { code: 'IQ', dial: '+964', flag: '🇮🇶', name: 'Irak' },
    { code: 'IE', dial: '+353', flag: '🇮🇪', name: 'Irlanda' },
    { code: 'IL', dial: '+972', flag: '🇮🇱', name: 'Israel' },
    { code: 'JM', dial: '+1', flag: '🇯🇲', name: 'Jamaica' },
    { code: 'JO', dial: '+962', flag: '🇯🇴', name: 'Jordania' },
    { code: 'KZ', dial: '+7', flag: '🇰🇿', name: 'Kazajistán' },
    { code: 'KE', dial: '+254', flag: '🇰🇪', name: 'Kenia' },
    { code: 'LV', dial: '+371', flag: '🇱🇻', name: 'Letonia' },
    { code: 'LB', dial: '+961', flag: '🇱🇧', name: 'Líbano' },
    { code: 'LT', dial: '+370', flag: '🇱🇹', name: 'Lituania' },
    { code: 'LU', dial: '+352', flag: '🇱🇺', name: 'Luxemburgo' },
    { code: 'MY', dial: '+60', flag: '🇲🇾', name: 'Malasia' },
    { code: 'MA', dial: '+212', flag: '🇲🇦', name: 'Marruecos' },
    { code: 'NL', dial: '+31', flag: '🇳🇱', name: 'Países Bajos' },
    { code: 'NI', dial: '+505', flag: '🇳🇮', name: 'Nicaragua' },
    { code: 'NG', dial: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: 'NO', dial: '+47', flag: '🇳🇴', name: 'Noruega' },
    { code: 'PK', dial: '+92', flag: '🇵🇰', name: 'Pakistán' },
    { code: 'PY', dial: '+595', flag: '🇵🇾', name: 'Paraguay' },
    { code: 'PH', dial: '+63', flag: '🇵🇭', name: 'Filipinas' },
    { code: 'PL', dial: '+48', flag: '🇵🇱', name: 'Polonia' },
    { code: 'PT', dial: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: 'PR', dial: '+1', flag: '🇵🇷', name: 'Puerto Rico' },
    { code: 'RO', dial: '+40', flag: '🇷🇴', name: 'Rumania' },
    { code: 'SA', dial: '+966', flag: '🇸🇦', name: 'Arabia Saudita' },
    { code: 'RS', dial: '+381', flag: '🇷🇸', name: 'Serbia' },
    { code: 'SG', dial: '+65', flag: '🇸🇬', name: 'Singapur' },
    { code: 'SK', dial: '+421', flag: '🇸🇰', name: 'Eslovaquia' },
    { code: 'SI', dial: '+386', flag: '🇸🇮', name: 'Eslovenia' },
    { code: 'ZA', dial: '+27', flag: '🇿🇦', name: 'Sudáfrica' },
    { code: 'SE', dial: '+46', flag: '🇸🇪', name: 'Suecia' },
    { code: 'CH', dial: '+41', flag: '🇨🇭', name: 'Suiza' },
    { code: 'TH', dial: '+66', flag: '🇹🇭', name: 'Tailandia' },
    { code: 'TR', dial: '+90', flag: '🇹🇷', name: 'Turquía' },
    { code: 'UA', dial: '+380', flag: '🇺🇦', name: 'Ucrania' },
    { code: 'AE', dial: '+971', flag: '🇦🇪', name: 'Emiratos Árabes Unidos' },
    { code: 'UY', dial: '+598', flag: '🇺🇾', name: 'Uruguay' },
    { code: 'VN', dial: '+84', flag: '🇻🇳', name: 'Vietnam' },
]);

// Filtrar países por búsqueda
const filteredCountries = computed(() => {
    if (!countrySearch.value) return countryCodes.value;
    const search = countrySearch.value.toLowerCase();
    return countryCodes.value.filter(country =>
        country.name.toLowerCase().includes(search) ||
        country.dial.includes(search) ||
        country.code.toLowerCase().includes(search)
    );
});

// Seleccionar país del dropdown
function selectCountry(country) {
    selectedCountry.value = country;
    countryCode.value = country.dial;
    countrySearch.value = '';
    showCountryDropdown.value = false;
    updatePhoneNumber();
}

// Ocultar dropdown con delay para permitir click
function hideCountryDropdown() {
    setTimeout(() => {
        showCountryDropdown.value = false;
    }, 200);
}

// Concatenar código de país con número
function updatePhoneNumber() {
    if (phoneNumber.value) {
        formReserva.value.cliente_phone = countryCode.value + phoneNumber.value;
    } else {
        formReserva.value.cliente_phone = '';
    }
}

// Observar cambios en countryCode y phoneNumber
watch([countryCode, phoneNumber], () => {
    updatePhoneNumber();
    validateField('cliente_phone');
});

const deliveryMethods = [
    { id: 2, title: "T.Debito, T. Credito, PSE", turnaround: "El Pago se refleja de inmediato" },
    {
        id: 1,
        title: "Efectivo",
        turnaround: "Pagar en Oficinas",
    },
    {
        id: 3,
        title: "Giros y Consignaciones",
        turnaround: "Validaremos su pago una vez recibido.",
    },
];

const selectedDeliveryMethod = ref(deliveryMethods[0]);

// Resetear abono al cambiar a método que no lo admite
watch(selectedDeliveryMethod, (method) => {
    if (method.id === 1) {
        abonoPercentage.value = null;
    }
});

const handleSubmit = () => {

    if (selectedDeliveryMethod.value.id == 3 && !formReserva.value.soporte) {
        Swal.fire({
            title: "Comprobante Requerido",
            text: "Por favor adjunte el comprobante de pago.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Entendido",
        });
        return;
    }
    isLoading.value = true;

    const formData = new FormData();
    Object.keys(formReserva.value).forEach(key => {
        if (key === 'soporte' && formReserva.value[key] instanceof File) {
            formData.append(key, formReserva.value[key]);
        } else if (key !== 'soporte') {
            formData.append(key, formReserva.value[key]);
        }
    });
    formData.append('payment_method', selectedDeliveryMethod.value.id);
    if (abonoPercentage.value) {
        formData.append('abono_porcentaje', abonoPercentage.value);
    }
    axios.post(route('booking.reservar.by.api'), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        if (response.data.payment != null) {
            location.href = response.data.payment.data.payment.payment_url; // Redirigir al enlace de pago
        } else {
            router.get(route('booking.success', response.data.bookingService.id));
        }
    })
        .catch(error => {
            console.error("Error al generar el enlace de pago:", error);
            isLoading.value = false;
        });
};

function previewFiles(event) {
    const file = event.target.files[0];
    if (!file) return;

    soporte.value = file;
    formReserva.value.soporte = file;
    fileName.value = file.name;

    // Crear preview para imágenes
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            filePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
        // Para PDFs, usar un ícono
        filePreview.value = 'pdf';
    } else {
        filePreview.value = 'file';
    }
}

function removeFile() {
    soporte.value = '';
    formReserva.value.soporte = '';
    filePreview.value = null;
    fileName.value = '';
}

// Validación en tiempo real
function validateField(fieldName) {
    switch (fieldName) {
        case 'cliente_name':
        case 'cliente_last_name':
            if (!formReserva.value[fieldName] || formReserva.value[fieldName].trim().length < 2) {
                fieldErrors.value[fieldName] = 'Debe tener al menos 2 caracteres';
                fieldValid.value[fieldName] = false;
            } else {
                fieldErrors.value[fieldName] = '';
                fieldValid.value[fieldName] = true;
            }
            break;
        case 'cliente_email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formReserva.value.cliente_email) {
                fieldErrors.value.cliente_email = 'El correo es requerido';
                fieldValid.value.cliente_email = false;
            } else if (!emailRegex.test(formReserva.value.cliente_email)) {
                fieldErrors.value.cliente_email = 'Ingresa un correo válido';
                fieldValid.value.cliente_email = false;
            } else {
                fieldErrors.value.cliente_email = '';
                fieldValid.value.cliente_email = true;
            }
            break;
        case 'cliente_phone':
            if (!phoneNumber.value) {
                fieldErrors.value.cliente_phone = 'El teléfono es requerido';
                fieldValid.value.cliente_phone = false;
            } else if (phoneNumber.value.length < 7) {
                fieldErrors.value.cliente_phone = 'Ingresa un número válido';
                fieldValid.value.cliente_phone = false;
            } else {
                fieldErrors.value.cliente_phone = '';
                fieldValid.value.cliente_phone = true;
            }
            break;
    }
    saveFormToLocalStorage();
}

// Guardado automático en localStorage
function saveFormToLocalStorage() {
    const formData = {
        ...formReserva.value,
        soporte: null, // No guardar archivos
        timestamp: new Date().getTime()
    };
    localStorage.setItem('checkout_form', JSON.stringify(formData));
}

// Recuperar datos del localStorage
function loadFormFromLocalStorage() {
    const saved = localStorage.getItem('checkout_form');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            // Solo cargar si es de las últimas 24 horas
            const dayInMs = 24 * 60 * 60 * 1000;
            if (new Date().getTime() - data.timestamp < dayInMs) {
                Object.keys(data).forEach(key => {
                    if (key !== 'timestamp' && key !== 'soporte' && formReserva.value.hasOwnProperty(key)) {
                        formReserva.value[key] = data[key];
                    }
                });
            } else {
                localStorage.removeItem('checkout_form');
            }
        } catch (e) {
            console.error('Error cargando datos guardados:', e);
        }
    }
}

// Limpiar localStorage después de envío exitoso
function clearFormFromLocalStorage() {
    localStorage.removeItem('checkout_form');
}

const formatCurrency = (value) => {
    const number = Number(value) || 0;

    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(number);
};

const formatDate = (dateString) => {
    if (!dateString) return '';

    // Manejar ambos formatos: ISO completo (2025-12-03T05:00:00.000Z) o solo fecha (2025-12-03)
    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return dateString;

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Bogota'
    };

    const formattedDate = date.toLocaleDateString('es-ES', options);

    // Capitalizar la primera letra del día de la semana
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};


</script>

<style scoped>
/* Animación personalizada para el botón de reservar */
.reserve-button:active {
    transform: scale(0.97) translateY(0);
}

.reserve-button:not(:disabled):hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Animación sutil de rebote para el indicador */
@keyframes bounce-subtle {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-5px);
    }
}

.animate-bounce-subtle {
    animation: bounce-subtle 2s ease-in-out infinite;
}

/* Transiciones suaves */
* {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animaciones del Modal */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
    transition: all 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.95);
    opacity: 0;
}

/* Animaciones para las tarjetas */
@keyframes slide-in-left {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slide-in-right {
    from {
        opacity: 0;
        transform: translateX(30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-in-left {
    animation: slide-in-left 0.6s ease-out forwards;
}

.animate-slide-in-right {
    animation: slide-in-right 0.6s ease-out forwards;
}

.animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
}

/* Animación para los íconos circulares */
.w-10.h-10.rounded-full {
    transition: all 0.3s ease;
}

.w-10.h-10.rounded-full:hover {
    transform: rotate(360deg) scale(1.1);
}

/* Animación para el header del resumen */
.w-16.h-16.rounded-full {
    animation: pulse-scale 2s ease-in-out infinite;
}

@keyframes pulse-scale {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

@keyframes slide-in-up {
    from {
        transform: translateY(100%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-slide-in-up {
    animation: slide-in-up 0.3s ease-out forwards;
}

/* Reducir animaciones para usuarios sensibles */
@media (prefers-reduced-motion: reduce) {

    .animate-slide-in-left,
    .animate-slide-in-right,
    .animate-fade-in-up,
    .animate-slide-in-up,
    .animate-bounce-subtle,
    .w-16.h-16.rounded-full {
        animation: none;
    }

    .w-10.h-10.rounded-full:hover {
        transform: none;
    }

    * {
        transition: none !important;
    }
}
</style>
