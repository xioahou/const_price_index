<template>
  <div class="priceList">

    <div class="search">
      <div class="dideu_logo">
        <img src="../../common//assets//img/logo蓝字.png" alt="">
      </div>
      <div class="search_content">
        <el-input v-model="formData.search" placeholder="请输入产品名称/CAS号/公司名称" @change="searchBtn">
          <template #suffix>
            <el-button type="primary" @click="searchBtn" :icon="Search" :loading="searchLoading">搜索</el-button>
          </template>
        </el-input>
      </div>
      <div class="price_car" @click="goPk">
        <span>pk</span>
        <div class="corner_marker">
          {{ compareTotal }}
        </div>
      </div>
    </div>

    <el-table style="width: 100%;" :data="tableData" v-loading="loading" element-loading-text="加载中..." height="75%"
      :show-header="tableData.length > 0" border>
      <el-table-column label="产品信息" width="170" class-name="top-align-col" align="center" fixed>
        <template #default="scope">
          <p class="tag">名称:{{ scope.row.title }}</p>
          <p class="tag">CAS号:{{ scope.row.cas }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="inquiry_list" width="3400" label="产品详情">
        <template #default="scope_inquiry">
          <el-table :data="scope_inquiry.row.inquiry_list">
            <el-table-column prop="company_title" label="公司名称" width="200">
              <template #default="scopes">
                <p>{{ scopes.row.company_title }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="100">
              <template #default="scope">
                <p>{{ scope.row.type === 1 ? '每日询价' : "国际采购" }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="price_list" label="询价信息" width="1455">
              <template #default="scope">
                <el-table :data="scope.row.price_list" :border="true" :row-class-name="priceRowClassName">
                  <el-table-column label="pk" width="105" :resizable="false">
                    <template #default="scope">
                      <el-button type="primary" text @click="addPs(scope.row)" v-if="!pkList.includes(scope.row.id)">
                        加入PK
                      </el-button>
                      <el-button v-else type="danger" text @click="cancelPk(scope.row)">
                        取消PK
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="time" label="维护时间" width="105" :resizable="false" />
                  <el-table-column prop="num" label="数量" width="80" :resizable="false" />
                  <el-table-column prop="unit" label="单位" width="80" :resizable="false" />
                  <el-table-column prop="price" :label="scope.row.type === 1 ? '价格' : '人民币价格'" width="100"
                    :resizable="false" />
                  <el-table-column prop="unit_info" :label="scope.row.type === 1 ? '价格单位' : '人民币价格单位'" width="130"
                    :resizable="false" />

                  <el-table-column prop="dollar_price" label="美元价格" width="100" :resizable="false"
                    v-if="scope.row.type === 2" />
                  <el-table-column prop="dollar_unit_info" label="美元价格单位" width="130" :resizable="false"
                    v-if="scope.row.type === 2" />
                  <el-table-column prop="specs" label="规格" width="100" :resizable="false" />
                  <el-table-column prop="package" label="包装" width="100" :resizable="false" />
                  <el-table-column prop="salesperson" label="业务员" width="100" :resizable="false"
                    v-if="scope.row.type === 2" />
                  <el-table-column prop="period" label="货期" width="100" :resizable="false"
                    v-if="scope.row.type === 2" />
                  <el-table-column prop="remark" label="备注" width="100" :resizable="false" />
                  <el-table-column prop="admin_name" label="维护人" width="100" :resizable="false" />
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="contact_list" label="联系方式" width="375">
              <template #default="scope">
                <el-table :data="scope.row.contact_list" :border="true">
                  <el-table-column prop="name" label="联系人" width="100" />
                  <el-table-column prop="phone" label="联系电话" width="150" />
                  <el-table-column prop="email" label="邮箱" width="100" />
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip width="150" />
            <el-table-column prop="country" label="所在国家" show-overflow-tooltip width="150" />
            <el-table-column prop="website" label="公司网站" show-overflow-tooltip width="150" />
            <el-table-column prop="address" label="公司地址" show-overflow-tooltip width="150" />
            <el-table-column prop="company_else" label="公司其他信息" width="150" show-overflow-tooltip />
            <el-table-column prop="synonym" label="产品名称同义词" width="150" show-overflow-tooltip />
            <el-table-column prop="attachment" label="附件" width="100">
              <template #default="scope">

                {{ scope.row.attachment ? scope.row.attachment.split('|').length : 0 }}个
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template #default="scope">
                <el-button type="primary" text @click="editDilog(scope.row.id)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <el-pagination :page-sizes="[2, 4, 6, 8, 10]" layout="total,sizes, prev, pager, next" :total="total"
      v-model:current-page="formData.page" v-model:page-size="formData.size" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :default-page-size="2" :locale-text="{
        total: '共 {total} 条',
        page: '页',
        size: '条/页'
      }">


    </el-pagination>

    <!-- 编辑数据 -->
    <el-dialog v-model="editDilogForm" title="编辑" width="1300" class="editDilog" :fullscreen="true"
      style="height:100%;">
      <el-form label-width="auto" style="max-width: 600px">
        <el-form-item label="产品名称">
          <el-input v-model="addPriceForm.title" disabled />
        </el-form-item>
        <el-form-item label="产品CAS号">
          <el-input v-model="addPriceForm.cas" disabled />
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="addPriceForm.company_title" disabled />
        </el-form-item>
        <!-- <el-form-item label="公司名称展示">
          <el-switch v-model="addPriceForm.company_title_show"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #cccccc" active-value="1" inactive-value="2"
            disabled />
        </el-form-item> -->
      </el-form>
      <p class="form-title" @close="closeDialog">
        询价数据
      </p>
      <el-table :data="addPriceForm.priceList">
        <el-table-column prop="time" label="维护时间" width="180">

        </el-table-column>
        <el-table-column prop="num" label="数量" width="180">
          <template #default="{ row }">
            <!-- <el-input v-model="row.num" placeholder="数量值" :disabled="row.editable" /> -->
            <el-input-number v-model="row.num" :precision="2" :step="0.1" :disabled="row.editable"
              controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="110">
          <template #default="{ row }">
            <el-input v-model="row.unit" :disabled="row.editable" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="180">
          <template #default="{ row }">
            <!-- <el-input v-model="row.price" placeholder="价格" :disabled="row.editable" /> -->
            <el-input-number v-model="row.price" :precision="2" :step="0.1" :disabled="row.editable"
              controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column prop="unit_info" label="价格单位" width="110">
          <template #default="{ row }">
            <el-input v-model="row.unit_info" :disabled="row.editable" />
          </template>
        </el-table-column>
        <el-table-column prop="dollar_price" label="美元价格" width="180">
          <template #default="{ row }">
            <!-- <el-input v-model="row.price" placeholder="价格" :disabled="row.editable" /> -->
            <el-input-number v-model="row.dollar_price" :precision="2" :step="0.1" :disabled="row.editable"
              controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column prop="dollar_unit_info" label="美元价格单位" width="110">
          <template #default="{ row }">
            <el-input v-model="row.dollar_unit_info" :disabled="row.editable" />
          </template>
        </el-table-column>
        <el-table-column prop="salesperson" label="业务员" width="110" v-if="addPriceForm.type === 2">
          <template #default="{ row }">
            <el-input v-model="row.salesperson" :disabled="row.editable" />
          </template>
        </el-table-column>
        <el-table-column prop="period" label="货期" width="110" v-if="addPriceForm.type === 2">
          <template #default="{ row }">
            <el-input v-model="row.period" :disabled="row.editable" />
          </template>
        </el-table-column>
        <el-table-column prop="specs" label="规格" width="110">
          <template #default="{ row }">
            <el-input v-model="row.specs" :disabled="row.editable" />
          </template>
        </el-table-column>
        <el-table-column prop="package" label="打包" width="110">
          <template #default="{ row }">
            <el-input v-model="row.package" :disabled="row.editable" />
          </template>
        </el-table-column>
        <el-table-column prop="package" label="备注" width="250">
          <template #default="{ row }">
            <el-input v-model="row.remark" type="textarea" autosize resize="none" :disabled="row.editable" />
          </template>
        </el-table-column>
        <!-- 查看显示 -->
        <el-table-column prop="package" label="维护人" width="130">
          <!-- <template #default="{ row }" v-if="isShow">
            <el-input v-model="row.admin_name" placeholder="维护人" disabled />
          </template> -->
          <template #default="{ row }">
            <template v-if="row.add_type === '1'">
              <el-input v-model="row.user_name" disabled />
            </template>
            <template v-else>
              <el-input v-model="row.admin_name" disabled />
            </template>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="phone" label="维护人" width="180">
          <template #default="{ row }">
            <template v-if="row.add_type === '1' ">
              <el-input v-model="row.user_name" placeholder="维护人" disabled />
            </template>
            <template v-else>
              <el-input v-model="row.admin_name" placeholder="维护人" disabled />
            </template>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="is_show" label="显示状态" width="120">
          <template #default="{ row }">
            <el-switch v-model="row.is_show" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #cccccc"
              :active-value="1" :inactive-value="2" :disabled="row.editable" />
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button type="danger" size="small" @click="removeCloum($index)" v-if="!row.id">
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- <el-button type="primary" size="small" style="margin-top: 10px;" @click="addCloumn" text>
        添加一行
      </el-button> -->
      <p class="form-title">
        联系人
      </p>
      <el-table :data="addPriceForm.contactList" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180">
          <template #default="{ row }">
            <el-input v-model="row.name" placeholder="姓名" :disabled="row.editable" />
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="180">
          <template #default="{ row }">
            <el-input v-model="row.phone" placeholder="手机号" :disabled="row.editable" />
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
          <template #default="{ row }">
            <el-input v-model="row.email" placeholder="邮箱" :disabled="row.editable" />
          </template>
        </el-table-column>
        <!-- <el-table-column prop="is_show" label="显示状态" width="130">
          <template #default="{ row }">
            <el-switch v-model="row.is_show" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #cccccc"
              :active-value="1" :inactive-value="2" :disabled="row.editable" />
          </template>
        </el-table-column> -->
        <el-table-column prop="package" label="维护人" width="130">
          <!-- <template #default="{ row }" v-if="isShow">
            <el-input v-model="row.admin_name" placeholder="维护人" disabled />
          </template> -->
          <template #default="{ row }">
            <template v-if="row.add_type === '1'">
              <el-input v-model="row.user_name" placeholder="维护人" disabled />
            </template>
            <template v-else>
              <el-input v-model="row.admin_name" placeholder="维护人" disabled />
            </template>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button type="danger" size="small" @click="removeCloumCon($index)" v-if="!row.id">
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- <el-button type="primary" size="small" style="margin-top: 10px;" @click="addCloumnCon" text>
        添加一行
      </el-button> -->
      <el-form label-width="auto" style="max-width: 600px;margin-top: 20px;">
        <el-form-item label="公司网址">
          <el-input v-model="addPriceForm.website" disabled />
        </el-form-item>
        <el-form-item label="所在国家">
          <el-input v-model="addPriceForm.country" disabled />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addPriceForm.address" disabled />
        </el-form-item>
        <el-form-item label="公司其他信息">
          <el-input v-model="addPriceForm.company_else" disabled />
        </el-form-item>
        <el-form-item label="产品同义词">
          <el-input v-model="addPriceForm.synonym" disabled />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addPriceForm.remark" type="textarea" autosize resize="none" disabled />
        </el-form-item>
      </el-form>
      <template v-if="uploadFileList.length > 0">
        <div class="viewPic">
          <!-- <img :src="item" alt="" v-for="(item, index) in uploadFileList" :key="index">
              <p>移除</p> -->
          <div class="fileImg" v-for="(item, index) in uploadFileList" :key="index">
            <template v-if="isDocxFile(item)">
              <!-- <a :href="item" download class="dowFile">点击链接下载文件</a> -->
              <el-button @click="dowLoadFile(item)" type="primary" text style="text-decoration: underline;">
                点击此处下载文件
              </el-button>
              <!-- <el-button text type="primary" @click="delImag(index)"
                :disabled="index >= fileLength.length ? false : true">
                删除
              </el-button> -->
            </template>
            <template v-else>
              <el-image style="width: 100px; height: 100px" :src="item" :preview-src-list="[item]" />
              <!-- <el-button text type="primary" @click="delImag(index)"
                :disabled="index >= fileLength.length ? false : true">
                删除
              </el-button> -->
            </template>
          </div>
        </div>
      </template>
      <!-- <el-form-item label="附件">
        <el-upload class="upload-demo" :action="`${baseUrl}/upload`" :headers="headers" :on-success="upLoadSuccess"
          :show-file-list="false">
          <el-button type="primary">
            上传附件
          </el-button>
        </el-upload>
      </el-form-item> -->
      <template #footer>
        <div class="dialog-footer">
          <!-- <el-button @click="closeDialog" size="large" style="width: 100px;">取消</el-button>
          <el-button type="primary" @click="submit" :loading="btnLoading" size="large" style="width: 100px;">
            确定
          </el-button> -->
          <div class="addLike">
            <i class="iconfont icon-like-fill" :class="{ active: likeForm.type === 1 }" @click="likeClick(1)">点赞</i>
            <i class="iconfont icon-dontlike-fill-copy" :class="{ active: likeForm.type === 2 }"
              @click="likeClick(2)">点踩</i>
            <el-input style="width: 200px; margin-right: 20px;" v-model="likeForm.reason"></el-input>
            <el-button type="primary" @click="addLikebtn">提交点赞/点踩</el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- 全屏对话框 -->
    <el-dialog v-model="dialogVisible" fullscreen class="multiDialog">

      <!-- <table class="merge-table">
        <thead>

          <tr>
            <th class="field-col">产品名称</th>
            <th v-for="(p, pIdx) in pkTableList" :key="'p-' + pIdx" :colspan="productColSpan(p)" class="sort-target">
              {{ p.title }}
            </th>
          </tr>

          <tr>
            <th class="field-col">cas号</th>
            <th v-for="(p, pIdx) in pkTableList" :key="'cas-' + pIdx" :colspan="productColSpan(p)">
              {{ p.cas }}
            </th>
          </tr>

          <tr>
            <th class="field-col">企业名称</th>
            <th v-for="(inq, iIdx) in inquiryColumns" :key="'inq-' + iIdx" :colspan="inq.colspan">
              {{ inq.company_title }}
            </th>
          </tr>

          <tr>
            <th class="field-col">类型</th>
            <th v-for="(inq, iIdx) in priceType" :key="'type-' + iIdx">
              {{ inq.type === 1 ? '每日询价' : '国际采购' }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in fields" :key="field.key">
            <td class="field-col">{{ field.label }}</td>
            <td v-for="(col, cIdx) in columns" :key="'v-' + cIdx">
              <span :class="{ price: field.key === 'price' }">
                {{ col.price[field.key] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table> -->

      <div class="top">
        <div class="logo">
          <img src="../../common//assets/img/logo蓝字.png" alt="">
        </div>
        <div class="border" style="height: 80px; width: 1px; background-color: #cccccc;"></div>
        <h4>价格比对</h4>
      </div>
      <table class="merge-table" ref="tableRef">
        <thead>
          <tr>
            <th class="field-col">产品名称</th>
            <th v-for="(p, pIdx) in pkListIng" :key="'p-' + pIdx" :colspan="productColSpan(p)" class="sort-target"
              :data-product-index="pIdx">
              <div class="th-content">
                {{ p.title }}
              </div>
              <el-button link type="danger" class="sort-close" @click="tempCancelPk(p)">
                <el-icon>
                  <el-icon>
                    <CircleClose />
                  </el-icon>
                </el-icon>
              </el-button>
            </th>
          </tr>
          <tr>
            <th class="field-col">cas号</th>
            <th v-for="(p, pIdx) in pkListIng" :key="'cas-' + pIdx" :colspan="productColSpan(p)">
              {{ p.cas }}
            </th>
          </tr>
          <tr>
            <th class="field-col">企业名称</th>
            <th v-for="(inq, iIdx) in inquiryColumns" :key="'inq-' + iIdx" :colspan="inq.colspan" class="comp_name">
              <!-- {{ inq.company_title }} -->
              <div class="th-content">
                {{ inq.company_title }}
              </div>
              <el-button link type="danger" class="sort-close" @click="removeInquiry(inq, inquiryColumns)">
                <el-icon>
                  <el-icon>
                    <CircleClose />
                  </el-icon>
                </el-icon>
              </el-button>
            </th>
          </tr>
          <tr>
            <th class="field-col">类型</th>
            <th v-for="(inq, iIdx) in priceType" :key="'type-' + iIdx">
              {{ inq.type === 1 ? '每日询价' : '国际采购' }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in fields" :key="field.key">
            <td class="field-col">{{ field.label }}</td>
            <td v-for="(col, cIdx) in columns" :key="'v-' + cIdx">
              <span :class="{ price: field.key === 'price' || field.key === 'dollar_price' }">
                {{ col.price[field.key] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

    </el-dialog>
    <!-- 比价 -->
    <el-drawer v-model="drawer" title="询价比对" :size="1600">
      <el-card v-for="(item, index) in pkTableList" :key="index">
        <template #header>
          <div class="card-header">

            <el-button link type="danger" class="close-btn" @click="removePkAll(item.price_list)">
              <el-icon style="color:#333333;">
                <CircleClose />
              </el-icon>
            </el-button>
          </div>
        </template>
        <h1>{{ item.title }}</h1>
        <div class="desc">
          <span>{{ item.cas }}</span>
          <span>{{ item.company_title }}</span>
          <span>{{ item.price_list[0].type === 1 ? '每日询价' : '国际采购' }}</span>
        </div>
        <div class="tab_body" style="display: flex; align-items: center; gap:5px">
          <el-checkbox :model-value="isItemChecked(item)" @change="toggleSelect(item)" />
          <el-table :data="item.price_list" style="width: 100%" border>
            <el-table-column prop="time" label="维护时间" width="180" />
            <el-table-column prop="num" label="数量" width="180" />
            <el-table-column prop="unit" label="单位" />

            <el-table-column prop="price" label="价格" />
            <el-table-column prop="unit_info" label="价格单位" />
            <el-table-column prop="dollar_price" label="美元价格" />
            <el-table-column prop="dollar_unit_info" label="美元价格单位" />
            <el-table-column prop="specs" label="规格" />
            <el-table-column prop="package" label="包装" />
            <el-table-column prop="salesperson" label="业务员" />
            <el-table-column prop="period" label="交货周期" />
            <el-table-column prop="remark" label="备注" width="200" />
            <el-table-column prop="admin_name" label="维护人" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button text type="danger" @click="removePk(scope.row)">移除</el-button>
              </template>

            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-button style="margin-top: 10px; width: 100%;" type="primary" @click="pkDilog"
        :disabled="!(selectedIds.length >= 2)">去比对</el-button>
      <div class="his_see">
        <el-button plain type="primary" style="margin-top: 10px;">最近浏览</el-button>
        <el-card v-for="(item, index) in hisCate" :key="index">
          <h1>{{ item.title }}</h1>
          <div class="desc">
            <span>{{ item.cas }}</span>
            <span>{{ item.company_title }}</span>
            <span>{{ item.type === 1 ? '每日询价' : '国际采购' }}</span>
          </div>
          <div class="tab_body" style="display: flex; align-items: center; gap:5px">
            <el-table :data="item.price_list" style="width: 100%" border :row-class-name="priceRowClassName">
              <el-table-column prop="time" label="维护时间" width="180" />
              <el-table-column prop="num" label="数量" width="180" />
              <el-table-column prop="unit" label="单位" />
              <el-table-column prop="price" label="价格" />
              <el-table-column prop="unit_info" label="价格单位" />
              <el-table-column prop="specs" label="规格" />
              <el-table-column prop="package" label="包装" />
              <el-table-column prop="remark" label="备注" width="200" />
              <el-table-column prop="admin_name" label="维护人" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button text type="primary" @click="addPs(scope.row)"
                    v-if="!pkList.includes(scope.row.id)">+比对</el-button>
                  <el-button text type="danger" @click="cancelPk(scope.row)" v-else>取消</el-button>
                </template>

              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-button style="margin-top: 10px; width: 100%;">没有更多了</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { Search, CircleClose } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import { getListApi, addLikeApi, getNewPriceListApi, getPriceTotalApi, addCompareListApi, getCompareTotalApi, getCompareListApi, delCompareListApi, getCheckedCompareApi, getCategoryApi } from '../../api/homeList.js'
// import { useAuthStore } from '../../stores/user'

import { ref, onMounted, computed } from 'vue'

const searchLoading = ref(false)

const baseUrl = import.meta.env.VITE_APP_API_URL

const total = ref(0)
console.log(baseUrl);

const editDilogForm = ref(false)
const loading = ref(false)
const formData = ref({
  page: 1,
  limit: 2,
  search: '',
})
//获取详细数据
const addPriceForm = ref({
  title: "",
  cas: "",
  company_title: "",
  company_title_show: "",
  remark: "",
  country: "",
  website: "",
  address: "",
  company_else: "",
  synonym: "",
  id: "",
  type: '',
  attachment: "",
  priceList: [{
    id: "",
    num: "",
    unit: "",
    price: "",
    unit_info: "",
    dollar_price: "",
    dollar_unit_info: "",
    specs: "",
    package: "",
    is_show: 1,
    remark: "",
    salesperson: "", //业务员
    period: ""//货期

  }],
  contactList: [{
    id: "",
    name: "",
    phone: "",
    email: "",
    is_show: 1,
  }]
})

const uploadFileList = ref([])
const tableData = ref([

])
function isDocxFile(url) {
  const ext = url.split("?")[0].split(".").pop().toLowerCase()
  const officeExts = ["pdf", "doc", "docx", "xls", "xlsx"]
  return officeExts.includes(ext)
}
//编辑
const fileLength = ref(0)
const editDilog = async (id) => {
  const res = await getListApi(id)
  if (res.code === 200) {
    likeForm.value.id = res.data.row.id
    likeForm.value.reason = res.data.likeDown.reason
    likeForm.value.type = res.data.likeDown.type
    editDilogForm.value = true
    addPriceForm.value.id = res.data.row.id
    addPriceForm.value.title = res.data.row.title
    addPriceForm.value.cas = res.data.row.cas
    addPriceForm.value.company_title = res.data.row.company_title
    addPriceForm.value.company_title_show = res.data.row.company_title_show
    addPriceForm.value.remark = res.data.row.remark
    addPriceForm.value.country = res.data.row.country
    addPriceForm.value.website = res.data.row.website
    addPriceForm.value.address = res.data.row.address
    addPriceForm.value.company_else = res.data.row.company_else
    addPriceForm.value.synonym = res.data.row.synonym
    addPriceForm.value.type = res.data.row.type
    uploadFileList.value = res.data.row.attachment === "" ? [] : res.data.row.attachment.split('|')
    fileLength.value = res.data.row.attachment === "" ? [] : res.data.row.attachment.split('|')
    addPriceForm.value.priceList = res.data.priceList?.map(item => ({ ...item, editable: true }))
    addPriceForm.value.contactList = res.data.contactList?.map(item => ({ ...item, editable: true }))

  }
}

const isFirstSearch = ref(true)
const getListData = async () => {
  searchLoading.value = true
  loading.value = true
  try {
    console.log(formData.value.search);

    // const [res, resTotal] = await Promise.all([
    //   getNewPriceListApi(formData.value),
    //   getPriceTotalApi(formData.value.search)
    // ])
    const res = await getNewPriceListApi(formData.value)
    if (isFirstSearch.value) {

      const resTotal = await getPriceTotalApi(formData.value.search)
      if (resTotal.code === 200) {
        total.value = resTotal.data.total

      }
    }

    if (res.code === 200) {
      tableData.value = res.data.list
      // isFirstSearch.value = true

    } else {
      console.log('请先登录');

      ElMessage.error(res.msg)
    }
    searchLoading.value = false

  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
}
async function handleCurrentChange(val) {
  formData.value.page = val
  isFirstSearch.value = false
  await getListData()
  // formData.value.page = 1

  isFirstSearch.value = true
}
async function handleSizeChange(val) {
  formData.value.limit = val
  isFirstSearch.value = false
  await getListData()
  isFirstSearch.value = true
}
const btnLoading = ref(false)

function dowLoadFile(data) {
  if (!data) return
  const link = document.createElement("a")
  link.href = data
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
function closeDialog() {
  editDilogForm.value = false
  addPriceForm.value = {

    id: "",
    attachment: "",
    priceList: [{
      id: "",
      num: "",
      unit: "",
      price: "",
      unit_info: "",
      specs: "",
      package: "",
      is_show: 1,
      remark: "",

    }],
    contactList: [{
      id: "",
      name: "",
      phone: "",
      email: "",
      is_show: 1,
    }]
  }
  uploadFileList.value = []
}
const likeForm = ref({
  id: "",
  reason: "",
  type: null,
})
function likeClick(id) {
  console.log(id);

  if (likeForm.value.type === id) {
    // 如果再次点击同一个，就取消
    likeForm.value.type = ""
  } else {
    // 否则切换
    likeForm.value.type = id
  }
}
async function addLikebtn() {
  btnLoading.value = true
  const res = await addLikeApi(likeForm.value)
  if (res.code === 200) {
    ElMessage.success('提交成功')
  } else {
    ElMessage.success('提交失败')
  }
  btnLoading.value = false
}
async function searchBtn() {


  formData.value.page = 1
  await getListData()

}
//比价
const drawer = ref(false)
const pkList = ref([]);
const ids = ref([])
const addPs = async (row) => {
  ids.value.push(row.id)
  try {
    const res = await addCompareListApi(ids.value)
    if (res.code === 200) {
      pkList.value.push(row.id);
      getCompareTotal()
      ElMessage.success("加入比价成功");
      if (drawer.value) {
        await getCompareList()
      }

    } else {
      ElMessage.error(res.msg || "加入失败");
    }
  } catch (error) {
    ElMessage.error("请求失败", error);
  }
  if (!pkList.value.includes(row.id)) {
    pkList.value.push(row.id);
  }
  ids.value = []
};
const cacelIds = ref([])
const cancelPk = async (row) => {
  cacelIds.value.push(row.id)
  try {
    const res = await delCompareListApi(cacelIds.value)
    if (res.code === 200) {
      pkList.value = pkList.value.filter(id => id !== row.id);
      getCompareTotal()
      if (drawer.value) {
        await getCompareList()

      }


    } else {
      ElMessage.error(res.data.msg || "取消失败");
    }
  } catch (error) {
    ElMessage.error("请求失败", error);
  }
  cacelIds.value = []
};

const priceRowClassName = ({ row }) => {
  return pkList.value.includes(row.id) ? "pk-selected-row" : "";
};
const compareTotal = ref(0)
const getCompareTotal = async () => {
  const res = await getCompareTotalApi()
  if (res.code === 200) {
    pkList.value = res.data.list || [];
    compareTotal.value = res.data.total
  } else {
    ElMessage.error(res.msg || "获取比价失败");
  }
}
onMounted(() => {
  getCompareTotal(); // ← 自动获取已加入比价 ID 并渲染
});
const pkTableList = ref([])
const goPk = async () => {

  console.log(pkListIng);

  await getCompareList()
  drawer.value = true


}
const getCompareList = async () => {
  const res = await getCompareListApi()
  if (res.code === 200) {
    pkTableList.value = res.data.list
    await getCategory()

  }
}

// const removePkAll = (item) => {
//   console.log(item);

//   const rows = Array.isArray(item) ? item : [item];

//   ElMessageBox.confirm(
//     '移除后，该比价信息将被取消比对',
//     "移除该比价吗?",
//     {
//       confirmButtonText: '立即移除',
//       cancelButtonText: '我再想想',
//       type: 'warning'
//     }
//   )
//     .then(async () => {
//       // 遍历逐个调用 cancelPk
//       for (const row of rows) {
//         await cancelPk(row);
//         selectedIds.value = selectedIds.value.filter(id => id !== row.id);
//       }

//       await getCompareTotal();
//       await goPk();

//       // ElMessage.success("移除成功");
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: '已取消操作'
//       });
//     });

// }
const noConfirmRemovePk = ref(localStorage.getItem("noConfirmRemovePk") === "true");

const removePkAll = (item) => {
  console.log(item);

  const rows = Array.isArray(item) ? item : [item];

  // 如果“不再提醒”已勾选，则直接执行
  if (noConfirmRemovePk.value) {
    rows.forEach(async (row) => {
      await cancelPk(row);
      selectedIds.value = selectedIds.value.filter(id => id !== row.id);
    });

    getCompareTotal();
    goPk();
    return;
  }

  ElMessageBox({
    title: "移除该比价吗?",
    message: `
      <div>
        <p>移除后，该比价信息将被取消比对</p>
        <label style="margin-top: 10px; display:flex; align-items:center;">
          <input id="no-more-remove" type="radio" style="margin-right:6px;" />
          不再提示
        </label>
      </div>
    `,
    dangerouslyUseHTMLString: true,
    showCancelButton: true,
    confirmButtonText: "立即移除",
    cancelButtonText: "我再想想",
    type: "warning",
    closeOnClickModal: false
  })
    .then(async () => {
      const checkbox = document.getElementById("no-more-remove");

      if (checkbox?.checked) {
        noConfirmRemovePk.value = true;
        localStorage.setItem("noConfirmRemovePk", "true");
      }

      for (const row of rows) {
        await cancelPk(row);
        selectedIds.value = selectedIds.value.filter(id => id !== row.id);
      }

      await getCompareTotal();
      await goPk();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消操作"
      });
    });
};

// const removePk = async (row) => {
//   ElMessageBox.confirm(
//     '移除后，该比价信息将被取消比对',
//     "移除该比价吗?",
//     {
//       confirmButtonText: '立即移除',
//       cancelButtonText: '我在想想',
//       type: '移除该比价吗?',
//     }
//   )
//     .then(async () => {
//       await cancelPk(row)
//       await goPk()
//       selectedIds.value = selectedIds.value.filter(i => i !== row.id)
//       await getCompareTotal()
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: '移除失败',
//       })
//     })



// }
const removePk = async (row) => {
  // 如果“不再提醒”已勾选，则直接执行
  if (noConfirmRemovePk.value) {
    await cancelPk(row);
    selectedIds.value = selectedIds.value.filter(id => id !== row.id);
    await getCompareTotal();
    await goPk();
    return;
  }

  ElMessageBox({
    title: "移除该比价吗?",
    message: `
      <div>
        <p>移除后，该比价信息将被取消比对</p>
        <label style="margin-top: 10px; display:flex; align-items:center;">
          <input id="no-more-remove" type="radio" style="margin-right:6px;" />
          不再提示
        </label>
      </div>
    `,
    dangerouslyUseHTMLString: true,
    showCancelButton: true,
    confirmButtonText: "立即移除",
    cancelButtonText: "我再想想",
    type: "warning",
    closeOnClickModal: false
  })
    .then(async () => {
      const checkbox = document.getElementById("no-more-remove");

      if (checkbox?.checked) {
        noConfirmRemovePk.value = true;
        localStorage.setItem("noConfirmRemovePk", "true");
      }

      await cancelPk(row);
      selectedIds.value = selectedIds.value.filter(id => id !== row.id);
      await getCompareTotal();
      await goPk();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消操作"
      });
    });
};

const selectedIds = ref([]);
const isItemChecked = (item) => {
  // 如果该 card 下的所有 price_list.id 都在 selectedIds 中 → 表示选中
  return item.price_list.every(p => selectedIds.value.includes(p.id));
};
const toggleSelect = (item) => {
  console.log(item);

  const priceIds = item.price_list.map(p => p.id);

  const isChecked = isItemChecked(item);

  if (!isChecked) {
    // 勾选时：加入所有 price_list 的 id
    selectedIds.value = [...new Set([...selectedIds.value, ...priceIds])];
  } else {
    // 取消勾选时：删除所有 price_list 的 id
    selectedIds.value = selectedIds.value.filter(id => !priceIds.includes(id));
  }
};
const hisCate = ref([])
const getCategory = async () => {
  const res = await getCategoryApi()
  if (res.code === 200) {
    hisCate.value = res.data.list
  }

}
const fields = [
  { label: "维护日期", key: "time" },
  { label: "数量", key: "num" },
  { label: "单位", key: "unit" },
  { label: "人民币价格", key: "price" },
  { label: "人民币价格单位", key: "unit_info" },
  { label: "美元价格", key: "dollar_price" },
  { label: "美元价格单位", key: "dollar_unit_info" },
  { label: "规格", key: "specs" },
  { label: "包装", key: "package" },
  { label: "业务员", key: "salesperson" },
  { label: "交货周期", key: "period" },
  { label: "备注", key: "remark" },
  { label: "维护人", key: "admin_name" }
];
const dialogVisible = ref(false)
const pkDilog = async () => {
  await getCheckedCompare()
  console.log(pkListIng.value);



}

const pkListIng = ref([])
const getCheckedCompare = async () => {
  const str = selectedIds.value.join(',')
  const res = await getCheckedCompareApi(str)
  if (res.code === 200) {
    pkListIng.value = res.data.list
    dialogVisible.value = true
  }
}

const productColSpan = (product) => {
  console.log(product);

  console.log(product.inquiry.reduce((sum, inq) => sum + inq.price_list.length, 0));

  return product.inquiry.reduce((sum, inq) => sum + inq.price_list.length, 0);
};
const inquiryColumns = computed(() => {
  const result = [];

  pkListIng.value.forEach((p) => {
    p.inquiry.forEach((inq) => {
      console.log('ssssss', inq);

      result.push({
        company_title: inq.company_title,
        type: inq.type,
        colspan: inq.price_list.length,
        cas: inq.cas
      });
    });
  });
  console.log('result', result);

  return result;
});

const priceType = computed(() => {
  const result = [];

  pkListIng.value.forEach((p) => {
    p.inquiry.forEach((inq) => {
      inq.price_list.forEach((priceItem) => {
        result.push({

          company_title: inq.company_title,
          type: priceItem.type,
          colspan: inq.price_list.length,
        });
      })

    });
  });
  console.log('result', result);

  return result;
}
)

const columns = computed(() => {
  const cols = [];
  pkListIng.value.forEach((p, pIdx) => {
    p.inquiry.forEach((inq, iIdx) => {
      inq.price_list.forEach((price, prIdx) => {
        cols.push({
          product: p,
          inquiry: inq,
          price,
          productIndex: pIdx,
          inquiryIndex: iIdx,
          priceIndex: prIdx
        });
      });
    });
  });
  console.log('cols', cols);
  return cols;
});
//计算企业数量
const getTotalCompanyCount = () => pkListIng.value.reduce((sum, p) => sum + p.inquiry.length, 0);
// const tempCancelPk = (product) => {
//   console.log('删除产品名称');
//   console.log(product);

//   const totalCompanies = getTotalCompanyCount();

//   // 如果删掉这个产品，剩余企业数量是多少？
//   const afterDeleteCompanyCount =
//     totalCompanies - product.inquiry.length;
//   if (afterDeleteCompanyCount < 2) {
//     ElMessage.warning("至少需要保留两个企业询价信息!");
//     return;
//   }


//   ElMessageBox.confirm(
//     '移除后，该比价信息将被取消比对',
//     "移除该比价吗?",
//     {
//       confirmButtonText: '立即移除',
//       cancelButtonText: '我再想想',
//       type: 'warning',
//     }
//   )
//     .then(() => {
//       // ElMessage({
//       //   type: 'success',
//       //   message: 'Delete completed',
//       // })
//       // 删除产品
//       pkListIng.value = pkListIng.value.filter((p) => p.cas !== product.cas);
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: '已取消操作',
//       })
//     })


// }

// function removeInquiry(inquiry, ins) {
//   console.log(inquiry);
//   console.log(ins);

//   const totalCompanies = getTotalCompanyCount();

//   if (totalCompanies <= 2) {
//     ElMessage.warning("至少需要保留两个企业询价信息!");
//     return;
//   }

//   // 遍历所有产品并删除企业
//   pkListIng.value.forEach((p) => {
//     console.log(p);

//     if (p.inquiry) {
//       p.inquiry = p.inquiry.filter((i) => i.id !== inquiry.id);
//     }
//   });

//   pkListIng.value = pkListIng.value.filter((p) => p.inquiry.length > 0);
// }
// function removeInquiry(inquiry) {
//   // 遍历所有产品的 inquiry 数组，删除匹配的企业
//   pkListIng.value.forEach(p => {
//     if (p.inquiry) {
//       p.inquiry = p.inquiry.filter(i => i.id !== inquiry.id);
//     }
//   });

//   // 如果希望删除后该产品没有任何企业时，也删除该产品
//   pkListIng.value = pkListIng.value.filter(p => p.inquiry.length > 0);
// }
// function removeInquiry(inquiry) {

//   // 用 company_title 进行匹配删除
//   pkListIng.value = pkListIng.value.map(product => {
//     if (product.inquiry) {
//       return {
//         ...product,
//         inquiry: product.inquiry.filter(i => i.company_title !== inquiry.company_title)
//       };
//     }
//     return product;
//   }).filter(p => p.inquiry.length > 0);
// }

// function removeInquiry(inquiry) {
//   console.log("要删除的企业：", inquiry);

//   // 计算总企业数量
//   const totalCompanies = pkListIng.value.reduce((sum, p) => sum + (p.inquiry?.length || 0), 0);

//   if (totalCompanies <= 2) {
//     ElMessage.warning("至少需要保留两个企业询价信息!");
//     return;
//   }


//   ElMessageBox.confirm(
//     '移除后，该比价信息将被取消比对',
//     "移除该比价吗?",
//     {
//       confirmButtonText: '立即移除',
//       cancelButtonText: '我再想想',
//       type: 'warning',
//     }
//   )
//     .then(() => {
//       // 遍历所有产品并删除匹配的企业（用 company_title 作为唯一标识）
//       pkListIng.value = pkListIng.value.map(product => {
//         if (product.inquiry) {
//           return {
//             ...product,
//             inquiry: product.inquiry.filter(i => i.company_title !== inquiry.company_title)
//           };
//         }
//         return product;
//       })
//         // 删除没有企业的产品
//         .filter(p => p.inquiry.length > 0);
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: '已取消操作',
//       })
//     })
// }
const tempCancelPk = (product) => {
  console.log('删除产品名称');
  console.log(product);

  const totalCompanies = getTotalCompanyCount();

  // 如果删掉这个产品，剩余企业数量是多少？
  const afterDeleteCompanyCount = totalCompanies - product.inquiry.length;
  if (afterDeleteCompanyCount < 2) {
    ElMessage.warning("至少需要保留两个企业询价信息!");
    return;
  }

  // 如果“不再提醒”已勾选，则直接执行
  if (noConfirmRemovePk.value) {
    pkListIng.value = pkListIng.value.filter(p => p.cas !== product.cas);
    return;
  }

  ElMessageBox({
    title: "移除该比价吗?",
    message: `
      <div>
        <p>移除后，该比价信息将被取消比对</p>
        <label style="margin-top: 10px; display:flex; align-items:center;">
          <input id="no-more-remove" type="radio" style="margin-right:6px;" />
          不再提示
        </label>
      </div>
    `,
    dangerouslyUseHTMLString: true,
    showCancelButton: true,
    confirmButtonText: "立即移除",
    cancelButtonText: "我再想想",
    type: "warning",
    closeOnClickModal: false
  })
    .then(() => {
      const checkbox = document.getElementById("no-more-remove");

      if (checkbox?.checked) {
        noConfirmRemovePk.value = true;
        localStorage.setItem("noConfirmRemovePk", "true");
      }

      pkListIng.value = pkListIng.value.filter(p => p.cas !== product.cas);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消操作"
      });
    });
};

// function removeInquiry(inquiry) {
//   console.log("要删除的企业：", inquiry);

//   // 计算总企业数量
//   const totalCompanies = pkListIng.value.reduce((sum, p) => sum + (p.inquiry?.length || 0), 0);

//   if (totalCompanies <= 2) {
//     ElMessage.warning("至少需要保留两个企业询价信息!");
//     return;
//   }

//   ElMessageBox.confirm(
//     '移除后，该比价信息将被取消比对',
//     "移除该比价吗?",
//     {
//       confirmButtonText: '立即移除',
//       cancelButtonText: '我再想想',
//       type: 'warning',
//     }
//   )
//     .then(() => {
//       const targetCompany = inquiry.company_title;
//       const targetCas = inquiry.cas; // 这里 cas 在 inquiry 里

//       // 遍历所有产品并删除匹配的企业
//       pkListIng.value = pkListIng.value.map(p => {
//         if (p.inquiry) {
//           return {
//             ...p,
//             inquiry: p.inquiry.filter(i => !(i.company_title === targetCompany && i.cas === targetCas))
//           };
//         }
//         return p;
//       })
//         // 删除没有企业的产品
//         .filter(p => p.inquiry.length > 0);
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: '已取消操作',
//       });
//     });
// }
function removeInquiry(inquiry) {
  console.log("要删除的企业：", inquiry);

  // 计算总企业数量
  const totalCompanies = pkListIng.value.reduce((sum, p) => sum + (p.inquiry?.length || 0), 0);

  if (totalCompanies <= 2) {
    ElMessage.warning("至少需要保留两个企业询价信息!");
    return;
  }

  // 如果“不再提醒”已勾选，则直接执行删除
  const doDelete = () => {
    const targetCompany = inquiry.company_title;
    const targetCas = inquiry.cas;

    // 遍历所有产品并删除匹配的企业
    pkListIng.value = pkListIng.value
      .map(p => {
        if (p.inquiry) {
          return {
            ...p,
            inquiry: p.inquiry.filter(i => !(i.company_title === targetCompany && i.cas === targetCas))
          };
        }
        return p;
      })
      // 删除没有企业的产品
      .filter(p => p.inquiry.length > 0);
  };

  if (noConfirmRemovePk.value) {
    doDelete();
    return;
  }

  ElMessageBox({
    title: "移除该比价吗?",
    message: `
      <div>
        <p>移除后，该比价信息将被取消比对</p>
        <label style="margin-top: 10px; display:flex; align-items:center;">
          <input id="no-more-remove" type="radio" style="margin-right:6px;" />
          不再提示
        </label>
      </div>
    `,
    dangerouslyUseHTMLString: true,
    showCancelButton: true,
    confirmButtonText: "立即移除",
    cancelButtonText: "我再想想",
    type: "warning",
    closeOnClickModal: false
  })
    .then(() => {
      const checkbox = document.getElementById("no-more-remove");
      if (checkbox?.checked) {
        noConfirmRemovePk.value = true;
        localStorage.setItem("noConfirmRemovePk", "true");
      }
      doDelete();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消操作"
      });
    });
}


</script>

<style lang="less" scoped>
.priceList {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;

  :deep(.search) {
    display: flex;
    // flex-direction: column;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    margin: 10px 0;

    .dideu_logo {
      width: 200px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .search_content {
      flex: 1;
      // margin-top: 20px;

      .el-input {
        .el-input__wrapper {

          padding-right: 0px;
          box-shadow: none;
          border: 1px solid #017CB8;
          // .el-input_suffix {
          //   padding-right: 30px;
          // }
        }
      }

      .search_hist {
        // margin: 10px 0;
        display: flex;
        justify-content: space-between;
        /* 左右分布 */
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #ccc;

        ul {
          display: flex;
          flex-direction: column;

          /* 如果要横向排列 li */
          gap: 5px;

          /* li 间距 */
          li {
            list-style: none;
          }
        }
      }


    }

    .price_car {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      height: 60px;
      width: 60px;
      border-radius: 50%;
      background-color: #ffffff;
      border: 2px solid #02A7F0;
      font-size: 20px;
      font-weight: 600;
      color: #02A7F0;
      cursor: pointer;

      .corner_marker {
        position: absolute;
        top: -15px;
        right: -10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #D9001B;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: 400;
        color: #D9001B;
      }
    }
  }

  :deep(.el-table) {
    .pk-cancel-row {
      background-color: #FEF2F2 !important;
      /* 你可以换成任意颜色 */
    }

    .pk-selected-row {
      background-color: #FEF2F2 !important;
      /* 柔和高亮，可自改 */
    }

    .top-align-col {
      display: table-cell !important;
      /* 去掉 flex */
      vertical-align: top;
      /* 顶部对齐 */
      line-height: normal;


    }

    .cell {
      white-space: normal;
      /* 允许换行 */
      overflow: visible;
      /* 超出容器的文字显示出来 */
    }

  }

  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }


  :deep(.editDilog) {
    height: 700px;
    overflow: hidden;
    overflow-y: scroll;

    .el-card {
      .el-card__body {
        display: flex;
        gap: 40px;

        .iconfont {
          cursor: pointer;
        }



        .iconhover {
          color: red;
        }
      }
    }
  }

  :deep(.el-dialog) {
    .el-dialog__header {
      .el-icon {
        font-size: 30px;
      }
    }

    .addLike {
      height: 80px;
      display: flex;
      align-items: center;

      .iconfont {
        margin-right: 20px;
        font-size: 18px;
        cursor: pointer;
      }

      .active {
        color: red;
      }
    }

    .viewPic {
      img {
        width: none !important;
        height: none !important;
      }

      .dowFile {
        text-decoration: underline;
        color: #007aff;
      }

    }
  }

  :deep(.priceDrawer) {
    .el-icon {
      cursor: pointer;
    }

    .el-card {
      margin-bottom: 5px;
    }

    .el-drawer__header {
      margin-bottom: 0;
    }

    .el-card__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 5px;
      gap: 50px;

      p {
        display: flex;
        justify-content: space-between;
        flex: 1;
      }
    }

    .el-card__body {
      padding: 0 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }


  }

  :deep(.multiDialog) {
    .top {
      display: flex;
      gap: 10px;
      align-items: center;
      height: 100px;

      .logo {
        width: 200px;
        height: 100px;

        img {
          width: 100%;
        }
      }

      h4 {
        margin-top: -10px;
        margin-left: 10px;
        font-size: 30px;
      }
    }

    .el-dialog__body {
      margin-top: 20px;
    }

    .merge-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;

      th,
      td {
        border: 1px solid #ccc;
        padding: 6px 8px;
        text-align: center;
        word-break: break-word;
      }

      // 第一列固定宽度
      tr>th:first-child,
      tr>td:first-child {
        width: 120px;
      }

      // 当整行只有三列（字段列 + 两列）时，平分剩余宽度
      tr {

        &:has(td:nth-child(3):only-child),
        &:has(th:nth-child(3):only-child) {

          td:nth-child(2),
          td:nth-child(3),
          th:nth-child(2),
          th:nth-child(3) {
            width: calc((100% - 120px)/2);
          }
        }
      }
    }

    .merge-table th,
    .merge-table td {
      border: 1px solid #ccc;
      padding: 6px 8px;
      text-align: center;
    }

    .field-col {
      background: #f5f7fa;
      text-align: left;
      font-weight: bold;
      width: 120px;
    }

    .price {
      color: red;
      font-weight: bold;
    }

    .sort-target,
    .comp_name {
      position: relative;

      .sort-close {
        position: absolute;
        top: 0px;
        right: 0px;

        .el-icon {
          color: #333333;
        }
      }
    }
  }

  :deep(.el-drawer) {
    .el-card {
      .el-card__header {
        padding: 0px;
        height: 30px;
      }

      .card-header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 30px;
      }

      h1 {
        font-size: 16px;
        margin-left: 20px;
      }

      .desc {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        margin-left: 20px;
      }
    }
  }
}
</style>
