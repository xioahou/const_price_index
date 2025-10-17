<template>
  <div class="hhh">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="产品信息" width="180">
        <template #default="scope">
          <p class="tag">名称:{{ scope.row.title }}</p>
          <p class="tag">CAS号:{{ scope.row.cas }}</p>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" width="180">
        <template #default="scope">
          <el-table :data="scope.row.inquiry_list" style="width: 100%" class="no-border-table">
            <el-table-column prop="company_title">

            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="180">
        <template #default="scope">
          <el-table :data="scope.row.inquiry_list" style="width: 100%" class="no-border-table">
            <el-table-column prop="type">
              <template #default="scope">
                <span>{{ scope.row.type === 1 ? '每日询价' : '国际采购' }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="详情信息">
        <template #default="scope">
          <el-table :data="scope.row.inquiry_list" class="no-border-table">
            <el-table-column>
              <template #default="subScope">
                <el-table :data="subScope.row.price_list" class="no-border-table">
                  <el-table-column label="维护时间" prop="time" />
                  <el-table-column label="数量" prop="num" />
                  <el-table-column label="单位" prop="unit_info" />
                  <el-table-column label="价格" prop="price" />
                  <el-table-column label="价格单位" prop="unit_info" />
                  <el-table-column label="美元价格" prop="dollar_price" />
                  <el-table-column label="美元价格单位" prop="dollar_unit_info" />
                  <el-table-column label="规格" prop="specs" />
                  <el-table-column label="包装" prop="package" />
                  <el-table-column label="备注" prop="remark" />
                  <el-table-column label="维护人" prop="admin_name" />
                </el-table>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="conScope">
                <el-table :data="conScope.row.contact_list" class="no-border-table">
                  <el-table-column label="联系电话" prop="phone" />
                  <el-table-column label="联系人" prop="name" />
                  <el-table-column label="联系邮箱" prop="email" />
                </el-table>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="备注"></el-table-column>
      <el-table-column label="所在国家" prop="country"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
const tableData = [
  {
    "cas": "11",
    "id_list": "108051",
    "max_price_time": 1760341184,
    "title": "11",
    "inquiry_list": [
      {
        "id": 108051,
        "title": "11",
        "type": 1,
        "cas": "11",
        "company_title": "111",
        "remark": "",
        "country": "",
        "website": "",
        "address": "",
        "company_else": "",
        "synonym": "",
        "attachment": "",
        "price_time": "2025-10-13",
        "admin_name": "王成",
        "price_list": [
          {
            "id": 146101,
            "inquiry_id": 108051,
            "num": 1.4,
            "unit": "kg",
            "price": "0.90",
            "unit_info": "fdf",
            "is_show": 1,
            "dollar_price": null,
            "dollar_unit_info": "",
            "specs": "dfd",
            "package": "fdf",
            "salesperson": "",
            "period": "",
            "remark": "dfdf",
            "admin_id": 145,
            "time": "2025-10-13",
            "admin_name": "王成"
          },
          {
            "id": 146099,
            "inquiry_id": 108051,
            "num": 0.6,
            "unit": "编辑了",
            "price": "0.70",
            "unit_info": "11",
            "is_show": 1,
            "dollar_price": null,
            "dollar_unit_info": "",
            "specs": "11",
            "package": "11",
            "salesperson": "",
            "period": "",
            "remark": "111",
            "admin_id": 145,
            "time": "2025-10-13",
            "admin_name": "王成"
          },
          {
            "id": 146098,
            "inquiry_id": 108051,
            "num": 0.8,
            "unit": "1111",
            "price": "0.70",
            "unit_info": "11",
            "is_show": 1,
            "dollar_price": null,
            "dollar_unit_info": "",
            "specs": "111",
            "package": "",
            "salesperson": "",
            "period": "",
            "remark": "",
            "admin_id": 145,
            "time": "2025-10-13",
            "admin_name": "王成"
          },
          {
            "id": 146097,
            "inquiry_id": 108051,
            "num": 1.7,
            "unit": "deref",
            "price": "1.30",
            "unit_info": "dfdff",
            "is_show": 1,
            "dollar_price": null,
            "dollar_unit_info": "",
            "specs": "fdfff",
            "package": "",
            "salesperson": "",
            "period": "",
            "remark": "",
            "admin_id": 145,
            "time": "2025-10-13",
            "admin_name": "王成"
          },
          {
            "id": 146092,
            "inquiry_id": 108051,
            "num": 0.9,
            "unit": "1111",
            "price": "1.30",
            "unit_info": "11",
            "is_show": 1,
            "dollar_price": null,
            "dollar_unit_info": "",
            "specs": "1",
            "package": "11",
            "salesperson": "",
            "period": "",
            "remark": "111",
            "admin_id": 145,
            "time": "2025-10-13",
            "admin_name": "王成"
          }
        ],
        "contact_list": [
          {
            "id": 134900,
            "inquiry_id": 108051,
            "name": "fddfdf",
            "phone": "fdf",
            "email": "dfdfdf"
          },
          {
            "id": 134899,
            "inquiry_id": 108051,
            "name": "11",
            "phone": "11",
            "email": "11"
          },
          {
            "id": 134898,
            "inquiry_id": 108051,
            "name": "11",
            "phone": "11",
            "email": "111"
          },
          {
            "id": 134897,
            "inquiry_id": 108051,
            "name": "11",
            "phone": "1",
            "email": "111"
          },
          {
            "id": 134896,
            "inquiry_id": 108051,
            "name": "111",
            "phone": "11",
            "email": "111"
          },
          {
            "id": 134892,
            "inquiry_id": 108051,
            "name": "1111",
            "phone": "1111",
            "email": ""
          },
          {
            "id": 134891,
            "inquiry_id": 108051,
            "name": "11",
            "phone": "1",
            "email": "111"
          }
        ]
      }
    ]
  },
  {
    "cas": "111",
    "id_list": "108048,108050",
    "max_price_time": 1760339825,
    "title": "111",
    "inquiry_list": [
      {
        "id": 108050,
        "title": "1211",
        "type": 2,
        "cas": "111",
        "company_title": "***",
        "remark": "",
        "country": "",
        "website": "",
        "address": "",
        "company_else": "",
        "synonym": "",
        "attachment": "",
        "price_time": "2025-10-13",
        "admin_name": "王成",
        "price_list": [
          {
            "id": 146096,
            "inquiry_id": 108050,
            "num": 1.8,
            "unit": "121",
            "price": "0.90",
            "unit_info": "111",
            "is_show": 2,
            "dollar_price": "***",
            "dollar_unit_info": "***",
            "specs": "",
            "package": "",
            "salesperson": "11111",
            "period": "111111",
            "remark": "",
            "admin_id": 145,
            "time": "2025-10-13",
            "admin_name": "王成"
          },
          {
            "id": 146090,
            "inquiry_id": 108050,
            "num": 1.3,
            "unit": "1111",
            "price": "0.90",
            "unit_info": "111111",
            "is_show": 2,
            "dollar_price": "***",
            "dollar_unit_info": "***",
            "specs": "",
            "package": "",
            "salesperson": "111",
            "period": "1111",
            "remark": "",
            "admin_id": 145,
            "time": "2025-10-13",
            "admin_name": "王成"
          }
        ],
        "contact_list": [
          {
            "id": 134895,
            "inquiry_id": 108050,
            "name": "1231",
            "phone": "111",
            "email": "1111"
          }
        ]
      },
      {
        "id": 108048,
        "title": "111",
        "type": 2,
        "cas": "111",
        "company_title": "***",
        "remark": "",
        "country": "",
        "website": "",
        "address": "",
        "company_else": "",
        "synonym": "",
        "attachment": "",
        "price_time": "2025-10-13",
        "admin_name": "王成",
        "price_list": [
          {
            "id": 146088,
            "inquiry_id": 108048,
            "num": 1,
            "unit": "111",
            "price": "0.90",
            "unit_info": "11111",
            "is_show": 2,
            "dollar_price": "***",
            "dollar_unit_info": "***",
            "specs": "",
            "package": "",
            "salesperson": "111",
            "period": "111",
            "remark": "",
            "admin_id": 145,
            "time": "2025-10-13",
            "admin_name": "王成"
          }
        ],
        "contact_list": []
      }
    ]
  }
]


</script>

<style lang="less" scoped>
.hhh {
  .el-table .el-table__row:hover {
    background-color: transparent !important;
  }

  /* 👇 针对嵌套表格去掉单元格边框 */
  .no-border-table ::v-deep(.el-table__cell) {
    border: none !important;
  }

  /* 如果还想去掉 el-table 自带的顶部分割线 (::before) */
  .no-border-table ::v-deep(.el-table::before) {
    content: none !important;
  }

  .no-border-table ::v-deep(.el-table__header-wrapper th) {
    border: none !important;
  }

  .no-border-table ::v-deep(.el-table::before),
  .no-border-table ::v-deep(.el-table__inner-wrapper::before),
  .no-border-table ::v-deep(.el-table__inner-wrapper::after) {
    content: none !important;
    display: none !important;
  }
}
</style>
