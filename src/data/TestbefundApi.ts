import axios from "axios";
import {TestbefundApiCreateTestRequest, TestbefundApiOrganisation, TestbefundApiTestWrapper} from "./ApiModel";
import {TestCaseTemplateData} from "../modules/TestCaseTemplate";
import {TestbefundConfig} from "../Config";

const url = TestbefundConfig.testbefundApiUrl;

export class TestbefundApi {
    static loadOrganisations(username: string, password: string): Promise<TestbefundApiOrganisation[]> {
        return axios.get(url + "/client", {
            auth: {
                username: username,
                password: password
            }
        }).then(result => {
            return result.data;
        }).catch(error => {
            console.error(error);
            return [];
        })
    }

    static createTest(tests: TestCaseTemplateData[], username: string, password: string): Promise<TestbefundApiTestWrapper> {
        const request: TestbefundApiCreateTestRequest = {
            testRequests: tests.map(value => ({clientId: value.client, icdCode: value.icdCode, title: value.name}))
        };
        return axios.post(url + "/v1/test/container", request, {
            auth: {
                username: username,
                password: password
            }
        }).then(result => {
            return result.data;
        }).catch(error => {
            console.error(error);
            return null;
        })
    }

    static isAuthenticated(username: string, password: string): Promise<boolean> {
        return axios.get(`${url}/v1/test/auth`, {
            auth: {username, password},
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(_ => true)
            .catch(err => {
                console.error(err);
                return false;
            });
    }
}
