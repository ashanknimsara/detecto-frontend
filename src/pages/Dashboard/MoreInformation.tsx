import DefaultLayout from '../../../src/layout/DefaultLayout';
import Breadcrumb from '../../../src/components/Breadcrumbs/Breadcrumb';
import Window  from './../../components/Window/window'
function MoreInformation() {
  return (
    <DefaultLayout >
        <Breadcrumb pageName="More Information Cases"/>
        <Window/>
    </DefaultLayout>
  )
}

export default MoreInformation