export interface TestbefundApiOrganisation {
    id: string;
    name: string;
    address: string;
    telefon: string;
    email: string;
    openingHours: string;
    homepage: string;
}

export interface TestbefundApiTest {
    icdCode: string;
    title: string;
}

export interface TestbefundApiCreateTestRequest {
    testRequests: TestbefundApiTest[]
    clientId: string | null;
}

export interface TestbefundApiTestWrapper {
    date: string;
    readId: string;
    writeId: string;
    testCases: TestbefundApiTestCase[]
}

export interface TestbefundApiTestCase {
    title: string;
    icdCode: string;
}
