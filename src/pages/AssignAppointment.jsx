import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import AssignApptMain from "../components/AssignApptMain";
import Footer from "../components/Footer";

function AssignAppointment() {
    return(
      <PageLayout>
          <Header />
          <AssignApptMain />
          <Footer />
      </PageLayout>
    );
}

export default AssignAppointment;