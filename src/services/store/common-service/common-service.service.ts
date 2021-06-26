import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreUrls } from '../../../api';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';
import { GalleryResponseModel } from '../../../interfaces/store/common/common';

const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
    providedIn: 'root'
})
export class CommonServiceService {
    private urls = StoreUrls;
    constructor(public httpClient: HttpClient) { }


    // 上传图片
    uploadImg(reqData: any): Observable<any> {
        const imgHttpOptions = {
            reportProgress: true,
        };
        return this.httpClient.post<any>(this.urls.PostStoreImgUpload, reqData, imgHttpOptions)
            .pipe(
            )
    }

    // 获取图片列表
    getGalleryList(page: number, keyword: string, per_page: number, region_code: any, type: any, image_name?: any) {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('keyword', keyword)
            .set('per_page', per_page.toString())
            .set('region_code', region_code)
            .set('type', type)
            .set('image_name', image_name ? image_name : '')

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };

        return this.httpClient.get<GalleryResponseModel>(this.urls.GetStoreImgList, findhttpOptions)
            .pipe(

            )
    }

    // 上传视频
    uploadVideo(reqData: any): Observable<any> {
        const imgHttpOptions = {
            reportProgress: true,
        };
        return this.httpClient.post<any>(this.urls.PostStoreVideoUpload, reqData, imgHttpOptions)
            .pipe(
            )
    }



    // 上传生鲜图片
    uploadGoodImg(reqData: any): Observable<any> {
        const imgHttpOptions = {
            reportProgress: true,
        };
        return this.httpClient.post<any>(this.urls.PostStoreGoodsImgUpload, reqData, imgHttpOptions)
            .pipe(
            )
    }



    // 获取图片列表
    getGoodImgList(page: number, per_page: number, name: any, cate_id: any, type: any) {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('name', name ? name : '')
            .set('cate_id', cate_id ? cate_id : '')
            .set('type', type ? type : '');


        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };

        return this.httpClient.get<GalleryResponseModel>(this.urls.GetStoreGoodsImgList, findhttpOptions)
            .pipe(

            )
    }


    // 上传视频
    uploadGoodVideo(reqData: any): Observable<any> {
        const imgHttpOptions = {
            reportProgress: true,
        };
        return this.httpClient.post<any>(this.urls.PostStoreGoodsVedioUpload, reqData, imgHttpOptions)
            .pipe(
            )
    }
}
