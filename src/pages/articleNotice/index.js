import React from 'react'
import style from './ArticleNotice.module.css'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'
const { Title } = Typography

const ArticleNoticePage = () => {
  return (
    <div className={style.wrapper}>
      <Title>Chính sách bảo hiểm 2022</Title>
      <p>Nguyễn Thị Hương, ngày 20/02/2022.</p>
      <Link style={{ color: 'blue' }}>chinhsach.xlsx</Link>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in massa tortor. Donec egestas egestas risus,
        eget hendrerit est. Phasellus fermentum consequat e&citur. Phasellus elit felis, ornare eu condimentum ut,
        imperdiet vel ipsum. Phasellus tristique, elit id congue venenatis, risus libero feugiat odio, ac fringilla arcu
        lacus vitae quam. Proin dui sem, tempor a tristique non, pulvinar ultrices tellus. Vivamus dignissim, augue vel
        viverra condimentum, ante augue porttitor ante, eu euismod enim mauris quis nisl. Vivamus iaculis lacus arcu, ac
        interdum felis lobortis non. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Maecenas vitae magna libero. Quisque mollis in quam ut suscipit.
      </p>
      <p>
        In accumsan varius laoreet. Curabitur rhoncus, orci a ultricies pulvinar, ligula lacus vulputate ipsum,
        ullamcorper maximus odio nulla et nulla. Donec nec iaculis lectus. Phasellus aliquam ut risus vitae scelerisque.
        Duis ut pulvinar tellus, eget laoreet risus. Vivamus pretium enim quis nulla sagittis consectetur. Ut eget leo
        ac nibh suscipit porta. Nulla consectetur, nisl non tincidunt porttitor, orci magna imperdiet nibh, in gravida
        turpis tellus sit amet sapien. Proin ornare sem massa, ut aliquet urna porta eu. Aenean vulputate turpis id
        risus mattis, eu euismod orci ultrices. Sed congue porttitor purus quis congue. Donec nulla leo, aliquam eget
        vestibulum at, dapibus ullamcorper augue. Sed ut massa nec sem sollicitudin rhoncus sit amet non elit. Cras
        e&citur lorem quis lectus sagittis dignissim. Aenean vitae hendrerit ligula.
      </p>
      <p>
        Maecenas semper nisi vitae aliquam blandit. Integer hendrerit, ante a semper elementum, neque augue ullamcorper
        quam, a imperdiet mi ligula quis sapien. Integer auctor vel ipsum id mollis. Ut rhoncus et diam vitae convallis.
        Donec vitae vehicula neque. Quisque sapien magna, tempor sit amet eros pretium, tempor vestibulum erat. Ut
        elementum, ante ut ornare ullamcorper, erat nibh hendrerit quam, eget auctor nisi elit ac risus.
      </p>
      <p>
        Mauris pharetra massa at diam vulputate dictum eget nec justo. Curabitur euismod justo sit amet nibh ullamcorper
        dictum. Vestibulum tristique pellentesque sem. Vestibulum quis velit a purus ultrices malesuada bibendum a
        lacus. Morbi vehicula pretium sapien nec vulputate. Donec lobortis, orci vel consectetur aliquam, nibh nibh
        lacinia velit, at ornare nibh neque in magna. Mauris lacus felis, ultricies ac dignissim tincidunt, faucibus et
        enim. Phasellus eget erat facilisis, sagittis orci ac, laoreet risus. Integer gravida massa nibh, a elementum
        mauris fermentum nec.
      </p>
      <p>
        Quisque pharetra enim vitae urna tempor, ac viverra risus dictum. Morbi faucibus ipsum non tortor sodales, nec
        pharetra lectus dictum. Suspendisse id sem erat. Ut pharetra posuere ligula luctus faucibus. In magna tellus,
        accumsan at molestie in, luctus a augue. Sed finibus nisi felis, consequat pulvinar ex pretium in. Phasellus
        bibendum rutrum metus, eu viverra diam viverra lacinia. Morbi risus ante, accumsan vel varius in, pretium eget
        augue.
      </p>
    </div>
  )
}

export default ArticleNoticePage
