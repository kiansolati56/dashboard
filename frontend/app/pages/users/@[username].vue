<script setup lang="ts">
definePageMeta({
    breadcrumb: false,
    middleware: 'auth',
    title: 'User'
})
</script>

<template>
    <div class="relative h-40 w-full">
        <div class="absolute inset-0 bg-linear-to-tr from-[#757f9a] to-[#d7dde8]" />

        <div class="absolute inset-0 bg-linear-to-b from-transparent to-thprimarybackground" />

        <div
            class="absolute inset-x-8 xl:inset-x-15 top-21 z-10 flex flex-col lg:flex-row lg:justify-between items-center lg:items-end">
            <div class="flex flex-col lg:flex-row lg:justify-start items-center gap-3">
                <div class="size-30 overflow-hidden rounded-full border-2 border-thgray-200/50 p-1">
                    <nuxt-img src="/images/kian-profile.png" class="size-full rounded-full object-cover"
                        alt="Kian Farrokhzad" />
                </div>

                <div class="flex flex-col items-center lg:items-start pt-1">
                    <h1 class="text-2xl font-semibold text-thprimary">
                        Kian Farrokhzad
                    </h1>

                    <div class="mt-1 text-sm text-thprimary/70 flex items-center gap-1.5">
                        <button class="hover:text-thprimary transition-all duration-200">@mrcrowlley</button>
                        <span>•</span>
                        <span>Fullstack Web-developer</span>
                    </div>
                </div>
            </div>

            <div
                class="flex flex-col lg:flex-row lg:justify-end items-center gap-3 lg:mb-8 mt-5 md:mt-10 lg:mt-0 w-full lg:w-auto max-w-xl">
                <button
                    class="h-9 px-2 center gap-2 w-full rounded-lg border border-thgray-200/50 bg-thgray-100 hover:bg-thgray-300 text-sm font-mono">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                    <span class="mt-0.5">Message</span>
                </button>

                <button
                    class="h-9 px-2 center gap-2 w-full rounded-lg border border-thgray-200/50 bg-thgray-100 hover:bg-thgray-300 text-sm font-mono">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <span class="mt-0.5">Call</span>
                </button>

                <button
                    class="h-9 px-2 center gap-2 w-full rounded-lg bg-thprimary/90 hover:bg-thprimary text-thsecondary text-sm font-mono whitespace-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span class="mt-0.5">Follow User</span>
                </button>
            </div>

            <div class="hidden justify-end items-center gap-3 mb-8">
                <button
                    class="h-9 px-2 center gap-2 rounded-lg bg-thprimary/90 hover:bg-thprimary text-thsecondary text-sm font-mono whitespace-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <span class="mt-0.5">Edit Your Profile</span>
                </button>
            </div>
        </div>
    </div>

    <div class="h-75 md:h-80 lg:h-20 w-full border-b border-thgray-200/50 bg-thprimarybackground">

    </div>

    <div class="py-8 xl:py-10 px-8 xl:px-15 grid grid-cols-12 xl:gap-8">
        <div class="col-span-full xl:col-span-9">
            <div class="flex items-center w-full pb-5 border-b border-thgray-200/50 gap-7">
                <button class="flex items-center gap-2 text-blue-400 font-medium text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <span class="mt-0.5">Profile</span>
                </button>

                <button
                    class="flex items-center gap-2 text-thprimary font-medium hover:text-blue-400 transition-all duration-200 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    <span class="mt-0.5">Projects</span>
                </button>

                <button
                    class="flex items-center gap-2 text-thprimary font-medium hover:text-blue-400 transition-all duration-200 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                    </svg>
                    <span class="mt-0.5">Files</span>
                </button>
            </div>

            <div class="w-full bg-thprimary/8 border border-thgray-200/50 p-6 md:p-8 rounded-xl mt-8">
                <h2 class="text-thprimary text-xl font-medium">About</h2>
                <p class="mt-4 text-thprimary/50 font-light text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, suscipit esse? Eligendi ab
                    doloremque sed voluptatum consequuntur hic veritatis qui corrupti natus, est consectetur nihil
                    asperiores aperiam, dignissimos quas! Laudantium?
                </p>

                <div class="mt-6 border border-thgray-200/50 rounded-xl">
                    <div
                        class="flex flex-col md:grid grid-cols-12 border-b border-thgray-200/50 px-4 py-3 md:h-10 md:items-center gap-y-4">
                        <h3 class="col-span-2 text-thprimary text-sm">
                            Skills
                        </h3>
                        <div class="col-span-10 flex items-center flex-wrap md:flex-nowrap gap-2">
                            <div
                                class="h-6 px-2 text-xs center text-blue-400 font-mono border border-blue-400/50 bg-blue-400/10 rounded-full">
                                UI/UX Design
                            </div>
                            <div
                                class="h-6 px-2 text-xs center text-green-400 font-mono border border-green-400/50 bg-green-400/10 rounded-full">
                                HTML/CSS
                            </div>
                            <div
                                class="h-6 px-2 text-xs center text-indigo-400 font-mono border border-indigo-400/50 bg-indigo-400/10 rounded-full">
                                DevOps
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex flex-col md:grid grid-cols-12 border-b border-thgray-200/50 px-4 py-3 md:h-10 md:items-center gap-y-4">
                        <h3 class="col-span-2 text-thprimary text-sm">
                            Role
                        </h3>
                        <div class="col-span-10 flex items-center gap-2 text-xs">
                            Head of Bargee team
                        </div>
                    </div>

                    <div
                        class="flex flex-col md:grid grid-cols-12 border-b border-thgray-200/50 px-4 py-3 md:h-10 md:items-center gap-y-4">
                        <h3 class="col-span-2 text-thprimary text-sm">
                            Gender
                        </h3>
                        <div class="col-span-10 flex items-center gap-2 text-xs">
                            Male
                        </div>
                    </div>

                    <div
                        class="flex flex-col md:grid grid-cols-12 border-b border-thgray-200/50 px-4 py-3 md:h-10 md:items-center gap-y-4">
                        <h3 class="col-span-2 text-thprimary text-sm">
                            Projects
                        </h3>
                        <nuxt-link to="/projects" class="col-span-10 flex items-center gap-2 text-xs text-blue-400">
                            7 Projects
                        </nuxt-link>
                    </div>

                    <div
                        class="flex flex-col md:grid grid-cols-12 border-b border-thgray-200/50 px-4 py-3 md:h-10 md:items-center gap-y-4">
                        <h3 class="col-span-2 text-thprimary text-sm">
                            Location
                        </h3>
                        <div class="col-span-10 flex items-center gap-2 text-xs">
                            Iran
                        </div>
                    </div>

                    <div
                        class="flex flex-col md:grid grid-cols-12 border-b border-thgray-200/50 px-4 py-3 md:h-10 md:items-center gap-y-4">
                        <h3 class="col-span-2 text-thprimary text-sm">
                            Email
                        </h3>
                        <a href="#" class="col-span-10 flex items-center gap-2 text-xs text-blue-400">
                            kiansolati56@gmail.com
                        </a>
                    </div>

                    <div class="flex flex-col md:grid grid-cols-12 px-4 py-3 md:h-10 md:items-center gap-y-4">
                        <h3 class="col-span-2 text-thprimary text-sm">
                            Website
                        </h3>
                        <a href="https://kian.hostcraft.ir"
                            class="col-span-10 flex items-center gap-2 text-xs text-blue-400">
                            kian.hostcraft.ir
                        </a>
                    </div>
                </div>

                <h2 class="text-thprimary text-xl font-medium mt-10">Social Links</h2>

                <div class="mt-6 border border-thgray-200/50 rounded-xl">
                    <div class="flex flex-col md:grid grid-cols-12 px-4 py-3 md:h-10 md:items-center gap-y-4">
                        <h3 class="col-span-2 text-thprimary text-sm">
                            Telegram
                        </h3>
                        <a href="https://t.me/MrCrowlley" class="col-span-10 text-blue-400 text-xs">
                            @MrCrowlley
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>