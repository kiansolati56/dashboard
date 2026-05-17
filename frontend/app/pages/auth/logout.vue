<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'layout-without-sidebar-header'
})

const auth = useAuth()
const router = useRouter()

const runLogout = async () => {
    try {
        await auth.logout()
    } finally {
        await router.replace('/auth/login')
    }
}

await runLogout()
</script>