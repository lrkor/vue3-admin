import http from '../../common/http';
import {Response} from 'cloudview.ui-next';
import type PageModel from '@/common/models/page.model';

export default {
    test(id: string): Promise<Response<PageModel<any[]>>> {
        return http.get('/test', {
            queryParam: {id},
        });
    },
};
