import React from 'react'
import AddFlowForm from './AddFlowForm'
import AddDashboardForm from './AddDashboardForm'

export default function FormManager({closeModal,formType}) {
    return (
        <>
            {formType === "flow" ? <AddFlowForm closeModal={closeModal}/> : <AddDashboardForm closeModal={closeModal}/>}
        </>
    )
}
