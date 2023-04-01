import AdminLayout from "@/layouts/admin";
import PageHeader from '@/components/PageHeader'

const AdminIndex = () => {
  return <>
    <PageHeader title='ADMIN Index' />
  </>
}

AdminIndex.getLayout = page => {
  return <AdminLayout>{page}</AdminLayout>
}

export default AdminIndex;